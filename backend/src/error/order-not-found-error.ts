import { EcomError } from './ecommerce-error';

export class OrderNotFoundError extends EcomError {
    constructor(message: string) {
        super('ECOM-404-2', message);
        this.message = message;
    }
    message: string;
}