import { expect } from 'chai';
import { mockRequest, mockResponse } from 'mock-req-res';
import { OrderController } from '../../src/order/order-controller';
import { OrderDirector } from '../../src/order/order-director';
import { SinonStubbedInstance, SinonSandbox, createSandbox } from 'sinon';
import { OrderRequest } from '../../src/order/order-request';
import { OrderResponse } from '../../src/order/order-response';
import { Order } from '../../src/order/order';
import { EcomError } from '../../src/error/ecommerce-error';
import { OrderNotFoundError } from '../../src/error/order-not-found-error';
import { ORDER_STATUS } from '../../src/types/enums/order-status';

describe('Order Controller Tests', () => {
    let controller: OrderController;
    let director: SinonStubbedInstance<OrderDirector>;
    let reqStub: any;
    let resStub: any;
    let orderRequest: OrderRequest;
    let sinonSandbox: SinonSandbox;
    let expected: OrderResponse;
    let orderStub: Order;

    beforeEach(() => {
        sinonSandbox = createSandbox();
        director = sinonSandbox.createStubInstance(OrderDirector);
        reqStub = mockRequest();
        resStub = mockResponse();
        controller = new OrderController(director);

        orderRequest = {
            amount: 250,
            orderItems: [
                {
                    quantity: 1,
                    product:'fdb7fe0c-c277-4210-933d-dd737d0cc946',
                    price: 100
                },
                {
                    quantity: 1,
                    product: '42d20d14-5845-442f-86ac-25195c9f4d03',
                    price: 150
                }
            ],
            accountId: 'testaccount1234',
            status: ORDER_STATUS.PROCESSING
        }

        orderStub = {
            id: 'bc7e105d-8b7f-4909-82bc-8619d6c5d519',
            amount: 100,
            orderItems: [
                {
                    id: '29f350aa-8140-48ab-a206-382d42c261d9',
                    quantity: 1,
                    name: 'iPhone 8',
                    description: 'Used iphone 8',
                    category: 'electronics',
                    vendor: 'samsung',
                    price: 100
                }
            ],
            accountId: 'testaccount1234',
            status: ORDER_STATUS.PROCESSING,
            trackingCompany: null,
            trackingNumber: null
        }

        expected = new OrderResponse(orderStub.id, orderStub.amount, orderStub.orderItems,orderStub.accountId, orderStub.status, orderStub.trackingCompany, orderStub.trackingNumber );
    });

    afterEach(() => {
        sinonSandbox.restore();
    });

    describe('Function -> create', () => {
        it('Should throw an error if request is missing required property', async () => {
            const expectedStatus: number = 400;
            reqStub.body = { id: '123' };
            await controller.create(reqStub, resStub);
            expect(resStub.status.calledWith(expectedStatus)).to.be.true;
        });

        it('Should throw an error if director throws an error', async () => {
            let expected: EcomError = {} as any;
            reqStub.body = orderRequest;
            director.create.rejects(new EcomError('ECOM-500-1', 'db error'));
            try {
                await controller.create(reqStub, resStub);
            } catch (error: any) {
                expected = error;
            }
            expect(expected).not.to.be.undefined;
            expect(resStub.status.calledWith(500)).to.be.true;
        });

        it('Should call director and return orderId', async () => {
            reqStub.body = orderRequest;

            director.create.resolves(expected.id);

            await controller.create(reqStub, resStub);
            expect(resStub.json.calledWith(expected.id)).to.be.true;
        });
    });

    describe('Function -> get', () => {
        const testId = 'bc7e105d-8b7f-4909-82bc-8619d6c5d51'
        it('Should return OrderResponse if order is found', async () => {
            reqStub.params.orderId = testId;
            director.get.resolves(orderStub);

            await controller.get(reqStub, resStub);

            expect(resStub.json.calledWith(expected)).to.be.true;
        });

        it('should throw an error if error is thrown', async () => {
            reqStub.params.orderId = testId;
            director.get.rejects(new Error());

            await controller.get(reqStub, resStub);

            expect(resStub.status.calledWith(500)).to.be.true;
        });

        it('should throw an error if error is an ECOM error and should parse/return correct status', async () => {
            reqStub.params.orderId = testId;
            director.get.rejects(new OrderNotFoundError('Order Not Found'));

            await controller.get(reqStub, resStub);

            expect(resStub.status.calledWith(404)).to.be.true;
        });
    });

    describe('Function -> update', () => {
        const testId = 'bc7e105d-8b7f-4909-82bc-8619d6c5d51'
        it('Should return updated Order if order is updated', async () => {
            reqStub.body = {id: testId, trackingCompany: 'UPS'}
            const expected = [
                {
                    id: testId,
                    amount: 100,
                    order_status: ORDER_STATUS.PROCESSING,
                    order_items: [
                        '29f350aa-8140-48ab-a206-382d42c261d9'
                    ],
                    account_id: 'testaccount1234',
                    tracking_company: 'UPS',
                    tracking_number: null
                }
            ] as unknown as Order[]
            director.update.resolves(expected);

            await controller.update(reqStub, resStub);

            expect(resStub.json.calledOnce).to.be.true;
            expect(resStub.json.calledWith(expected)).to.be.true;
        });

        it('should throw an error if error is thrown', async () => {
            reqStub.params.orderId = testId;
            director.update.rejects(new Error());

            await controller.get(reqStub, resStub);

            expect(resStub.status.calledWith(500)).to.be.true;
        });
    });

});