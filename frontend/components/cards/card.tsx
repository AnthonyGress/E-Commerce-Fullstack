'use client';
import { Card, CardHeader, CardBody, Image, CardFooter, Button } from '@nextui-org/react';
import { button as buttonStyles } from '@nextui-org/theme';

import { PopupManager } from '../modals/popup-manager';
import { formatCurrency } from '../../app/utils';

type Props = {
    title: string;
    body?: string;
    image?: string | undefined;
    quantity?: number;
    productId: string;
    price: string;
    blurred?: boolean;

}

export const CustomCard = ({ title, image, body, quantity=1, productId, price, blurred=true }: Props) => {
    const addToCart = () => {
        const existingCart = localStorage.getItem('ecommerce-cart');

        console.log(existingCart);

        if (!existingCart) {
            localStorage.setItem('ecommerce-cart', JSON.stringify([{ name: title, id: productId, price: price, quantity: quantity }]));

        } else {
            const newCart = JSON.parse(existingCart);

            newCart.push({ name: title, id: productId, price: price, quantity: quantity });
            localStorage.setItem('ecommerce-cart', JSON.stringify(newCart));
        }

        PopupManager.success('Added to Cart');
    };

    return (
        <Card className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] py-4" isBlurred={blurred} shadow="sm">
            {title && <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <h4 className="font-bold text-large">{title}</h4>
            </CardHeader>}
            { image && <CardBody className={'overflow-visible py-2 items-center'}>
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={image}
                    width={150}
                />
            </CardBody>}
            <CardFooter className='flex-col'>
                <h5 className="text-medium">{body}</h5>
                <h5 className="text-medium">{formatCurrency(price)}</h5>
                <div className='mt-5'>
                    <Button
                        className={`${buttonStyles({
                            color: 'primary',
                            radius: 'full',
                            variant: 'solid',
                            size: 'md'
                        })} text-white`}
                        onClick={addToCart}
                    >
                                  Add to Cart
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
