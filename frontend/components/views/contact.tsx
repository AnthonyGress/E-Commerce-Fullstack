'use client';
import { Card, CardBody, Button, Textarea, Input } from '@nextui-org/react';
import { useRef, useState } from 'react';
import { StatusCodes } from 'http-status-codes';

import { PopupManager } from '../modals/popup-manager';

import { title } from '@/components/primitives';

export default function Contact() {
    const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });
    const [invalidName, setInvalidName] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const formRef = useRef<any>(null);

    const disableBtn = () => {
        if (loading || !formValues.name || !formValues.email || !formValues.message) {
            return true;
        }

        return false;
    };

    const isValidEmail = (email: string): boolean => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return emailPattern.test(email);
    };

    const validateForm = () => {
        if (!formValues.name) {
            setInvalidName(true);

            return false;
        } else {
            setInvalidName(false);
        }

        if (!formValues.message) {
            setInvalidMessage(true);

            return false;
        } else {
            setInvalidMessage(false);
        }

        if (!isValidEmail(formValues.email)) {
            setInvalidEmail(true);

            return false;
        } else {
            setInvalidEmail(false);
        }

        return true;

    };

    const resetFormValues = () => setFormValues({ name: '', email: '', message: '' });

    const sendEmail = async () => {
        setLoading(true);
        // const formData = new FormData(formRef.current).entries();
        // const body = JSON.stringify(Object.fromEntries(formData));
        const isValid = validateForm();

        if (isValid) {
            try {
                // demo always show success
                if (200 === StatusCodes.OK) {
                    PopupManager.success('We will be in contact with you shortly');
                    resetFormValues();
                } else {
                    PopupManager.failure('Something Went Wrong');
                }

            } catch (error) {
                console.error('failed', error);
                PopupManager.failure('Something Went Wrong');
            }

            console.log('done');
        }
        setLoading(false);
    };

    return (
        <section className="my-16" id='contact'>
            <div className='flex justify-center flex-col w-full gap-2 items-center mb-16' data-aos="fade-right">
                <h1 className={title()}>Contact Us</h1>
                <h2 className={'text-default-500 text-xl'}>{'Let\'s Get In Touch'}</h2>
            </div>
            <div className='flex justify-center align-center mb-8' data-aos="fade-up">
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] w-11/12" shadow="sm">
                    <CardBody className='overflow-visible py-2 items-center mb-8 mt-8'>
                        <h2 className='text-xl'>Send a Message</h2>

                    </CardBody>
                    <div className='w-full'>
                        <form
                            ref={formRef}
                            className='flex flex-col align-center justify-center gap-4 w-full p-4 overflow-hidden'
                            onSubmit={sendEmail}
                        >
                            <Input isRequired
                                className="max-w-xs self-center"
                                errorMessage='Name is required'
                                isInvalid={invalidName}
                                label="Name"
                                labelPlacement="inside"
                                name='name'
                                value={formValues.name}
                                onChange={(e) => setFormValues((prevState: any) => {
                                    let newObj = Object.assign({}, prevState);

                                    newObj.name = e.target.value;

                                    return newObj;
                                }
                                )}
                            />
                            <Input isRequired
                                className="max-w-xs self-center"
                                errorMessage='Must be a valid email'
                                isInvalid={invalidEmail}
                                label="Email"
                                labelPlacement='inside'
                                name='email'
                                type='email'
                                value={formValues.email}
                                onChange={(e) => setFormValues((prevState: any) => {
                                    let newObj = Object.assign({}, prevState);

                                    newObj.email = e.target.value;

                                    return newObj;
                                }
                                )}
                            />
                            <Textarea isRequired
                                className="max-w-xs self-center"
                                errorMessage='Message is required'
                                isInvalid={invalidMessage}
                                label="Message"
                                labelPlacement="inside"
                                name='message'
                                value={formValues.message}
                                onChange={(e) => setFormValues((prevState: any) => {
                                    let newObj = Object.assign({}, prevState);

                                    newObj.message = e.target.value;

                                    return newObj;
                                }
                                )}
                            />
                        </form>
                        <div className='w-full flex justify-center'><Button className='text-white mt-4 w-9/12 sm:w-1/2 mb-8' color='primary' isDisabled={disableBtn()} size='lg' onClick={sendEmail}>Send</Button></div>
                    </div>
                </Card>
            </div>
        </section>
    );
};

