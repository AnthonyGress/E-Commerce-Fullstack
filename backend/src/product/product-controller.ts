import { ValidationError, validate } from 'class-validator';
import { Request, Response } from 'express';
import { EcomError } from '../error/ecommerce-error';
import { ProductDirector } from './product-director';
import { ProductRequest } from './product-request';
import { Product } from './product';
import { ProductResponse } from './product-response';
import { ProductDeleteResponse } from './product-delete-response';

export class ProductController {
    private readonly director: ProductDirector;
    constructor(director: ProductDirector) {
        this.director = director;
    }

    public async create(req: Request, res: Response): Promise<void> {
        console.log('Received create product request', req.body);
        const product: ProductRequest = new ProductRequest(req.body.name, req.body.description, req.body.category,
            req.body.vendor, req.body.price, req.body.quantity);
        const errors: ValidationError[] = await validate(product);
        if (errors.length > 0) {
            res.status(400).json({ message: errors });
            return;
        }

        try {
            res.json(await this.director.create(product));
        } catch (error: unknown) {
            console.log(error);
            console.warn('an error occur trying to register a new Product', error);
            if (error instanceof EcomError) {
                const status: string = error.code.split('-')[1];
                console.warn('an error occurred when calling to create a Product', error);
                res.status(parseInt(status)).json(error);
            } else {
                res.status(500).send();
            }
        }
    }

    public async get(req: Request, res: Response): Promise<void> {
        console.log('get here', req.params.productId);

        const productId: string = req.params.productId;
        try {
            const product: Product = await this.director.get(productId);
            const productResponse: ProductResponse = new ProductResponse(product.id, product.name, product.description, product.category, product.vendor, product.price, product.quantity);

            res.json(productResponse);
        } catch (error) {
            console.log(error);
            console.error('An error occurred while trying to find a Product', error);
            if (error instanceof EcomError) {
                const status: string = error.code.split('-')[1];
                console.warn('an error occurred when calling to get an Product', error);
                res.status(parseInt(status)).json(error);
            } else {
                res.status(500).json({ message: 'An error occurred while trying to get Product' });
            }
        }
    }

    public async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const products: Product[] = await this.director.getAll();
            const productResponse: ProductResponse[] = products.map(p => new ProductResponse(p.id, p.name, p.description, p.category, p.vendor, p.price, p.quantity));
            res.json(productResponse);
        } catch (error: unknown) {
            res.status(500).send(error);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const productId: string = req.params.productId;
            const productPartial: Partial<Product> = {
                id: productId,
                ...req.body
            };
            const updateResponse: Product[] = await this.director.update(productPartial);
            res.json(updateResponse);
        } catch (error: unknown) {
            console.warn('an error occur trying to update a Product', error);
            if (error instanceof EcomError) {
                const status: string = error.code.split('-')[1];
                res.status(parseInt(status)).json(error);
            } else {
                res.status(500).json({ message: 'An error occurred while trying to update Product' });
            }
        }
    }

    // Should soft delete in production
    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const productId: string = req.params.productId;
            const deleteResponse: ProductDeleteResponse[] = await this.director.delete(productId);
            res.json(deleteResponse);
        } catch (error: unknown) {
            console.error('an error occurred trying to delete a Product', error);
            if (error instanceof EcomError) {
                const status: string = error.code.split('-')[1];
                res.status(parseInt(status)).json(error);
            } else {
                res.status(500).json({ message: 'An error occurred while trying to delete Product' });
            }
        }
    }
}