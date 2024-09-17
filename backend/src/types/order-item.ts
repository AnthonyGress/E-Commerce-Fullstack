import { Product } from '../product/product';

export type OrderItem = {
    id?: string;
    quantity: number;
    name: string,
    description: string,
    category: string,
    vendor: string,
    product?: Product;
    price: number
}