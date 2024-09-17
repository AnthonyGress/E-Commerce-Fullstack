import { expect } from 'chai';
import { SinonSandbox, SinonStubbedInstance, createSandbox } from 'sinon';
import { OrderDirector } from '../../src/order/order-director';
import { OrderRequest } from '../../src/order/order-request';
import { Order } from '../../src/order/order';
import { OrderNotFoundError } from '../../src/error/order-not-found-error';
import { OrderDao } from '../../src/order/order-dao';
import { ORDER_STATUS } from '../../src/types/enums/order-status';

describe('Order Director Tests', () => {
    const orderId: string = 'test-uuid';
    let director: OrderDirector;
    let daoStub: SinonStubbedInstance<OrderDao>;
    let orderStub: Order;
    let orderRequest: OrderRequest;
    let sinonSandbox: SinonSandbox;

    beforeEach(() => {
        sinonSandbox = createSandbox();
        daoStub = sinonSandbox.createStubInstance(OrderDao);
        director = new OrderDirector(daoStub);

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

    });

    afterEach(() => {
        sinonSandbox.restore();
    });

    describe('Function -> create', () => {
        it('Should throw an error if order dao get throws error', async () => {
            let expected: any;
            daoStub.insertOrderItem.rejects(new Error('error'));

            try {
                await director.create(orderRequest);
            } catch (error: any) {
                expected = error;
            }

            expect(expected).to.not.be.undefined;
            expect(expected.message).to.equal('error');
        });

        it('Should call dao insertOrderItems', async () => {
            daoStub.insertOrderItem.resolves([{id: '1'}]);

            await director.create(orderRequest);
            expect(daoStub.insertOrderItem.called).to.be.true;
        });

        it('Should call dao insert', async () => {
            daoStub.insertOrderItem.resolves([{id: '1'}]);

            await director.create(orderRequest);
            expect(daoStub.insert.called).to.be.true;
        });
    });

    describe('Function -> get', () => {
        it('Should throw Order not found error if no order is found', async () => {
            let expected: any;
            daoStub.get.rejects(new OrderNotFoundError('not found'));

            try {
                await director.get(orderId);
            } catch (error) {
                expected = error;
            }

            expect(expected).to.not.be.undefined
            expect(expected.code).to.equal('ECOM-404-2');
            expect(expected.message).to.equal('not found');
        });
    });

    describe('Function -> update', () => {
        const orderId: string = 'test-uuid';

        it('Should call dao update', async () => {
            await director.update({ id: orderId, trackingCompany: 'UPS' });


            expect(daoStub.update.called).to.be.true;
            expect(daoStub.update.calledWith({ id: orderId,trackingCompany: 'UPS' })).to.be.true;
        });
    });
});