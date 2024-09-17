import { PRODUCT_CATEGORY } from '../types/enums/product-category';

export class ProductResponse {
    constructor(id: string, name: string, description: string, category: PRODUCT_CATEGORY, vendor: string, price: number, quantity: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.vendor = vendor;
        this.price = price;
        this.quantity = quantity;
    }
    id: string;
    name: string;
    description: string;
    category: PRODUCT_CATEGORY;
    vendor: string;
    price: number;
    quantity: number;
}