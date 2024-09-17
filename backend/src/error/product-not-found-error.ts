import { EcomError } from './ecommerce-error';

export class ProductNotFoundError extends EcomError {
    constructor(message: string) {
        super('ECOM-404-1', message);
        this.message = message;
    }
    message: string;
}