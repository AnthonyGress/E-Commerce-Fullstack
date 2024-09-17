import { IsDefined } from 'class-validator';
import { ORDER_STATUS } from '../types/enums/order-status';
import { OrderItemRequest } from '../types/order-item-entity';

export class OrderRequest {
    constructor(amount: number, orderItems: OrderItemRequest[], accountId: string, status?: ORDER_STATUS) {
        this.amount = amount;
        this.orderItems = orderItems;
        this.accountId = accountId;
        this.status = status ? status : this.status = ORDER_STATUS.PROCESSING;
    }
    @IsDefined({ message: 'amount is required' })
    amount: number;
    @IsDefined({ message: 'orderItems are required' })
    orderItems: OrderItemRequest[];
    @IsDefined({ message: 'accountId is required' })
    accountId: string;
    status: ORDER_STATUS;
}