import { Knex } from 'knex';
import { OrderNotFoundError } from '../error/order-not-found-error';
import { Order } from './order';
import { OrderEntity } from '../types/order-entity';
import { OrderItemRequest } from '../types/order-item-entity';
import { ORDER_TABLE } from '../types/enums/order-table';
import { OrderItemIds } from '../types/order-item-ids';

export class OrderDao {
    private readonly dbClient: Knex<Order>;
    private readonly table: string = ORDER_TABLE.ORDER;
    constructor(dbClient: Knex<Order>) {
        this.dbClient = dbClient;
    }

    public async insert(order: OrderEntity): Promise<string> {
        console.log('inside order dao with order', order);

        const result: { id: string }[] = await this.dbClient.table(this.table).insert<Order>([order]).returning('id');
        return result[0].id;
    }

    public async insertOrderItem(orderItems: OrderItemRequest[]): Promise<OrderItemIds[]> {
        const result: OrderItemIds[] = await this.dbClient.table(ORDER_TABLE.ORDER_ITEM).insert<OrderItemRequest[]>(orderItems).returning('id');
        console.log('insert order item result', result);
        return result;
    }

    public async get(orderId: string): Promise<Order> {
        console.log('get order by id');
        const entity: { rows: Order[] } = await this.dbClient.raw(`
        SELECT
            o.id AS order_id,
            o.amount AS order_amount,
            o.account_id,
            o.order_status,
            o.tracking_company,
            o.tracking_number,
            json_agg(
                json_build_object(
                    'id', oi.order_item_id,
                    'quantity', oi.order_item_quantity,
                    'name', oi.name,
                    'description', oi.description,
                    'category', oi.category,
                    'vendor', oi.vendor,
                    'price', order_item_price

                )
            ) AS order_items
        FROM "order" o
        JOIN LATERAL (
            SELECT
                oi.id AS order_item_id,
                oi.price AS order_item_price,
                oi.quantity AS order_item_quantity,
                p.name,
                p.description,
                p.category,
                p.vendor
            FROM UNNEST(o.order_items) AS order_item_id
            JOIN order_item oi ON oi.id = order_item_id::uuid
            JOIN product p ON p.id = oi.product
        ) AS oi ON true
        WHERE o.id = '${orderId}'
        GROUP BY o.id, o.amount;
        `);
        console.log(entity);

        if (entity.rows.length === 0) {
            throw new OrderNotFoundError('No order found for id');
        }
        const order = this.toOrder(entity.rows[0]);
        console.log('order', order);

        return order;
    }

    public async update(order: Partial<Order>): Promise<Order[]> {
        const entity: Partial<OrderEntity> = this.toEntity(order as Order);
        console.log(entity);

        // remove undefined keys
        Object.keys(entity).forEach(key => entity[key] === undefined && delete entity[key]);
        // update only the updated order properties
        const updateResponse = await this.dbClient.table(this.table).update(entity).where('id', order.id).returning('*');
        if (updateResponse.length === 0) {
            throw new OrderNotFoundError('No order found for id');
        }
        return updateResponse;
    }

    private toEntity(order: Order): Partial<OrderEntity> {
        return {
            id: order.id,
            amount: order.amount,
            // order_items: order.orderItems,
            account_id: order.accountId,
            order_status: order.status,
            tracking_company: order.trackingCompany,
            tracking_number:order.trackingNumber
        };
    }

    private toOrder(entity: Order): Order {
        const order: Order = new Order(entity.order_id, entity.order_amount, entity.order_items, entity.account_id, entity.order_status, entity.tracking_company, entity.tracking_number);
        return order;
    }
}
