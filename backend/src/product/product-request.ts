import { IsDefined } from 'class-validator';
import { PRODUCT_CATEGORY } from '../types/enums/product-category';

export class ProductRequest {
    constructor(name: string, description: string, category: PRODUCT_CATEGORY, vendor: string, price: number, quantity: number) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.vendor = vendor;
        this.price = price;
        this.quantity = quantity;
    }
    @IsDefined({ message: 'name is required' })
    name: string;
    @IsDefined({ message: 'description is required' })
    description: string;
    @IsDefined({ message: 'category is required' })
    category: PRODUCT_CATEGORY;
    @IsDefined({ message: 'vendor is required' })
    vendor: string;
    @IsDefined({ message: 'price is required' })
    price: number;
    @IsDefined({ message: 'quantity is required' })
    quantity: number;
}