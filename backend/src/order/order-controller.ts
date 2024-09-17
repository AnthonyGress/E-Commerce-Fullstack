import { ValidationError, validate } from 'class-validator';
import { Request, Response } from 'express';
import { EcomError } from '../error/ecommerce-error';
import { OrderDirector } from './order-director';
import { OrderRequest } from './order-request';
import { Order } from './order';
import { OrderResponse } from './order-response';

export class OrderController {
    private readonly director: OrderDirector;
    constructor(director: OrderDirector) {
        this.director = director;
    }

    public async create(req: Request, res: Response): Promise<void> {
        console.log('Received create order request', req.body);
        const order: OrderRequest = new OrderRequest(req.body.amount, req.body.orderItems, req.body.accountId, req.body.status);
        const errors: ValidationError[] = await validate(order);
        if (errors.length > 0) {
            res.status(400).json({ message: errors });
            return;
        }

        try {
            res.json(await this.director.create(order));
        } catch (error: unknown) {
            console.log(error);
            console.warn('an error occur trying to register a new Order', error);
            if (error instanceof EcomError) {
                const status: string = error.code.split('-')[1];
                console.warn('an error occurred when calling to create an Order', error);
                res.status(parseInt(status)).json(error);
            } else {
                res.status(500).send();
            }
        }
    }

    public async get(req: Request, res: Response): Promise<void> {
        const orderId: string = req.params.orderId;
        try {
            const order: Order = await this.director.get(orderId);
            console.log('controller order', order);

            const orderResponse: OrderResponse = new OrderResponse(order.id, order.amount, order.orderItems, order.accountId, order.status, order.trackingCompany, order.trackingNumber);
            res.json(orderResponse);
        } catch (error) {
            console.log(error);
            console.error('An error occurred while trying to find an Order', error);
            if (error instanceof EcomError) {
                const status: string = error.code.split('-')[1];
                console.warn('an error occurred when calling to get an Order', error);
                res.status(parseInt(status)).json(error);
            } else {
                res.status(500).json({ message: 'An error occurred while trying to get an Order' });
            }
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const orderId: string = req.params.orderId;
            const orderPartial: Partial<Order> = {
                id: orderId,
                ...req.body
            };
            const updateResponse: Order[] = await this.director.update(orderPartial);

            res.json(updateResponse);
        } catch (error: unknown) {
            console.warn('an error occur trying to update an Order', error);
            if (error instanceof EcomError) {
                const status: string = error.code.split('-')[1];
                res.status(parseInt(status)).json(error);
            } else {
                res.status(500).json({ message: 'An error occurred while trying to update Order' });
            }
        }
    }
}