import { ORDER_STATUS } from './enums/order-status';

export type OrderEntity = {
    id: string;
    amount: number;
    order_status: ORDER_STATUS;
    account_id: string;
    order_items: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [index: string]: any;
}