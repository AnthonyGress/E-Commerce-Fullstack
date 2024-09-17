'use client';

import { Button } from '@nextui-org/button';
import { button as buttonStyles } from '@nextui-org/theme';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import NextLink from 'next/link';

import { formatCurrency } from '../../app/utils';
import { productImages } from '../../constants/products-images';
import { CheckoutCard } from '../cards/checkout-card';
import { PopupManager } from '../modals/popup-manager';

import { subtitle, title } from '@/components/primitives';

export default function Checkout() {
    const [cartState, setCartState] = useState([]);

    const total = cartState.length > 0 ? cartState.map((product: any) => parseInt(product.price)).reduce((a: number, b: number) => a+b) : 0;

    const submitOrder = async () => {
        const formatOrderItems = () => {
            const orderItems = cartState.map((p: any) => {return ({ quantity: 1, product: p.id, price: parseInt(p.price) });});

            console.log('order items', JSON.stringify(orderItems));

            return orderItems;
        };

        const body = {
            amount: total,
            orderItems: formatOrderItems(),
            accountId: 'testaccount1234'
        };

        try {
            const res = await axios.post('http://localhost:3001/order', body);

            if (res.status === StatusCodes.OK) {
                PopupManager.success(`Order Created - ${res.data}`);
                //reset cart
                localStorage.setItem('ecommerce-cart', JSON.stringify([]));
                setCartState([]);
            } else {
                PopupManager.failure('Order Failed');

            }

        } catch (error) {
            console.log(error);
            PopupManager.failure('Order Failed');
        }


    };

    const removeFromCart = (productId: string) => {
        const existingCart = localStorage.getItem('ecommerce-cart');

        console.log(existingCart);

        if (existingCart) {
            const cart = JSON.parse(existingCart);
            const newCart = cart.filter((item: any) => item.id !== productId && item );

            setCartState(newCart);

            localStorage.setItem('ecommerce-cart', JSON.stringify(newCart));
        }

        PopupManager.success('Removed from Cart');
    };

    useEffect(() => {
        const products =localStorage.getItem('ecommerce-cart');

        if (products) {
            setCartState(JSON.parse(products));
        }

    }, []);


    return (
        <section className="lg:my-0 py-5" id='checkout'>
            <div className='flex justify-center flex-col w-full gap-2 items-center mb-8' data-aos="fade-left">
                <h1 className={title()}>Checkout</h1>

            </div>
            <div data-aos="zoom-in-up">
                <div className="">
                    {cartState.length > 0
                        ? <div className='grid lg:grid-cols-2 gap-10 justify-center mt-16'>
                            <div>
                                {cartState.map((product: any) =>
                                    <div key={Math.random()} className='mt-4'>
                                        <CheckoutCard image={productImages.find((p) => p.name === product.name.toLowerCase().replaceAll(' ', ''))?.image} price={product.price} productId={product.id} removeFunc={removeFromCart} title={product.name}/>
                                    </div>
                                )
                                }
                            </div>
                            <div>
                                <h2 className={subtitle()}>Total: {formatCurrency(total.toString())}</h2>
                                <div className='mt-5'>
                                    <Button
                                        className={`${buttonStyles({
                                            color: 'primary',
                                            radius: 'full',
                                            variant: 'solid',
                                            size: 'md'
                                        })} text-white`}
                                        disabled={cartState.length < 1}
                                        onClick={submitOrder}
                                    >
                                          Checkout
                                    </Button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='flex flex-col items-center'>
                            <div>
                                <h2 className={subtitle()}>Cart is Empty</h2>
                            </div>
                            <NextLink className='mt-5' href={'/shop'}>
                                <Button
                                    className={`${buttonStyles({
                                        color: 'primary',
                                        radius: 'full',
                                        variant: 'solid',
                                        size: 'md'
                                    })} text-white`}
                                >
                                                Shop
                                </Button>
                            </NextLink>

                        </div>
                    }
                </div>
            </div>
        </section>
    );
};
