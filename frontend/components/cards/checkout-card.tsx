'use client';

import { Card, CardBody, Image, Button } from '@nextui-org/react';
import { button as buttonStyles } from '@nextui-org/theme';

import { formatCurrency } from '../../app/utils';

type Props = {
    title?: string;
    body?: string;
    image?: string | undefined;
    quantity?: number;
    productId: string;
    price: string;
    blurred?: boolean;
    button?: boolean;
    removeFunc: (productId: string) => void
}

export const CheckoutCard = ({ title, image, productId, price, blurred=true, button=true, removeFunc }: Props) => {


    return (
        <Card className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] py-4" isBlurred={blurred} shadow="sm">
            { image && <CardBody className={'overflow-visible py-2 flex'}>
                <div className="flex">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={image}
                        width={90}
                    />
                    <div className='ml-4'>
                        <h4 className="font-bold text-large">{title}</h4>
                        <h5 className="text-medium">{formatCurrency(price)}</h5>
                        { button && <div className='mt-4'>
                            <Button
                                className={`${buttonStyles({
                                    color: 'primary',
                                    radius: 'full',
                                    variant: 'solid',
                                    size: 'sm'
                                })} text-white`}
                                onClick={() => removeFunc(productId)}
                            >
                                  Delete
                            </Button>
                        </div>}
                    </div>

                </div>
            </CardBody>}
        </Card>
    );
};
