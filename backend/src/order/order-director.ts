
import { OrderEntity } from '../types/order-entity';
import { OrderItemIds } from '../types/order-item-ids';
import { Order } from './order';
import { OrderDao } from './order-dao';
import { OrderRequest } from './order-request';
import { v4 } from 'uuid';

export class OrderDirector {
    private readonly dao: OrderDao;

    constructor(dao: OrderDao) {
        this.dao = dao;
    }

    public async create(orderRequest: OrderRequest): Promise<string> {
        // store order items
        const orderItemIds: OrderItemIds[] = await this.dao.insertOrderItem(orderRequest.orderItems);

        // link order item ids to order
        const newOrder: OrderEntity = {
            id: v4(),
            amount: orderRequest.amount,
            order_status: orderRequest.status,
            account_id: orderRequest.accountId,
            order_items: orderItemIds.map(item => item.id)
        };
        // save order with linked order items
        return await this.dao.insert(newOrder);
    }

    public async get(orderId: string): Promise<Order> {
        return await this.dao.get(orderId);
    }

    public async update(order: Partial<Order>): Promise<Order[]> {
        return await this.dao.update(order);
    }
}
