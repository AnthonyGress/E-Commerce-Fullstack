import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import knex, { Knex } from 'knex';
import * as dbconfig from './db/knexfile';
import { Route } from './types/route';
import { HealthController } from './health/health-controller';
import { HealthDirector } from './health/health-director';
import { ProductDirector } from './product/product-director';
import { ProductDao } from './product/product-dao';
import { ProductController } from './product/product-controller';
import { OrderDao } from './order/order-dao';
import { OrderDirector } from './order/order-director';
import { OrderController } from './order/order-controller';

config();
const dbClient: Knex = knex(dbconfig);

const healthController: HealthController = new HealthController(new HealthDirector(dbClient));

const productDirector: ProductDirector = new ProductDirector(new ProductDao(dbClient));
const productController: ProductController = new ProductController(productDirector);
const orderDirector: OrderDirector = new OrderDirector(new OrderDao(dbClient));
const orderController: OrderController = new OrderController(orderDirector);


const routes: Route[] = [
    {
        method: 'get',
        path: '/health',
        isAuthenticated: false,
        handler: async (_req: Request, res: Response, _next: NextFunction) => res.json(await healthController.get())
    },
    // Product Routes
    {
        method: 'post',
        path: '/product',
        isAuthenticated: false,
        handler: async (req: Request, res: Response, _next: NextFunction) => await productController.create(req, res)
    },
    {
        method: 'get',
        path: '/product',
        isAuthenticated: false,
        handler: async (req: Request, res: Response, _next: NextFunction) => await productController.getAll(req, res)
    },
    {
        method: 'get',
        path: '/product/:productId',
        isAuthenticated: false,
        handler: async (req: Request, res: Response, _next: NextFunction) => await productController.get(req, res)
    },
    {
        method: 'put',
        path: '/product/:productId',
        isAuthenticated: false,
        handler: async (req: Request, res: Response, _next: NextFunction) => await productController.update(req, res)
    },
    {
        method: 'delete',
        path: '/product/:productId',
        isAuthenticated: false,
        handler: async (req: Request, res: Response, _next: NextFunction) => await productController.delete(req, res)
    },
    // Order Routes
    {
        method: 'post',
        path: '/order',
        isAuthenticated: false,
        handler: async (req: Request, res: Response, _next: NextFunction) => await orderController.create(req, res)
    },
    {
        method: 'get',
        path: '/order/:orderId',
        isAuthenticated: false,
        handler: async (req: Request, res: Response, _next: NextFunction) => await orderController.get(req, res)
    },
    {
        method: 'put',
        path: '/order/:orderId',
        isAuthenticated: false,
        handler: async (req: Request, res: Response, _next: NextFunction) => await orderController.update(req, res)
    },
];

export { routes };
