import { ORDER_STATUS } from '../types/enums/order-status';
import { OrderItem } from '../types/order-item';

export class Order {
    constructor(id: string, amount: number, orderItems: OrderItem[], accountId: string, status: ORDER_STATUS, trackingCompany?: string, trackingNumber?: string) {
        this.id = id;
        this.amount = amount;
        this.orderItems = orderItems;
        this.accountId = accountId;
        this.status = status;
        this.trackingCompany = trackingCompany;
        this.trackingNumber = trackingNumber;
    }

    id: string;
    amount: number;
    status: ORDER_STATUS;
    accountId: string;
    orderItems: OrderItem[];
    trackingCompany?: string | null;
    trackingNumber?: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [index: string]: any;
}