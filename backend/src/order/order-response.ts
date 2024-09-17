import { ORDER_STATUS } from '../types/enums/order-status';
import { OrderItem } from '../types/order-item';

export class OrderResponse {
    constructor(id: string, amount: number, orderItems: OrderItem[], accountId: string, status: ORDER_STATUS, trackingCompany?: string | null, trackingNumber?: string | null) {
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
    orderItems: OrderItem[];
    accountId: string;
    status: ORDER_STATUS;
    trackingCompany?: string | null;
    trackingNumber?: string | null;
}