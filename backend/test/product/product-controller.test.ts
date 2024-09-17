import { expect } from 'chai';
import { mockRequest, mockResponse } from 'mock-req-res';
import { ProductController } from '../../src/product/product-controller';
import { ProductDirector } from '../../src/product/product-director';
import { SinonStubbedInstance, SinonSandbox, createSandbox } from 'sinon';
import { ProductRequest } from '../../src/product/product-request';
import { ProductResponse } from '../../src/product/product-response';
import { Product } from '../../src/product/product';
import { EcomError } from '../../src/error/ecommerce-error';
import { PRODUCT_CATEGORY } from '../../src/types/enums/product-category';
import { ProductNotFoundError } from '../../src/error/product-not-found-error';

describe('Product Controller Tests', () => {
    let controller: ProductController;
    let director: SinonStubbedInstance<ProductDirector>;
    let reqStub: any;
    let resStub: any;
    let productRequest: ProductRequest;
    let sinonSandbox: SinonSandbox;
    let expected: ProductResponse;
    let productStub: Product;

    beforeEach(() => {
        sinonSandbox = createSandbox();
        director = sinonSandbox.createStubInstance(ProductDirector);
        reqStub = mockRequest();
        resStub = mockResponse();
        controller = new ProductController(director);

        productRequest = {
            name: 'iphone',
            description: 'test description',
            category: 'electronics' as PRODUCT_CATEGORY,
            vendor: 'apple',
            price: 100,
            quantity: 10
        };

        productStub = {
            id: 'test1234',
            name: 'iphone',
            description: 'test description',
            category: PRODUCT_CATEGORY.ELECTRONICS,
            vendor: 'apple',
            price: 100,
            quantity: 10
        };

        expected = new ProductResponse(productStub.id, productStub.name, productStub.description, productStub.category, productStub.vendor, productStub.price, productStub.quantity);
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
            reqStub.body = productRequest;
            director.create.rejects(new EcomError("ECOM-500-1", 'db error'));
            try {
                await controller.create(reqStub, resStub);
            } catch (error: any) {
                expected = error;
            }
            expect(expected).not.to.be.undefined;
            expect(resStub.status.calledWith(500)).to.be.true;
        });

        it('Should call director and return productId', async () => {
            reqStub.body = productRequest;

            director.create.resolves(expected.id);

            await controller.create(reqStub, resStub);
            expect(resStub.json.calledWith(expected.id)).to.be.true;
        });
    });

    describe('Function -> get', () => {
        const testId = 'test1234'
        it('Should return ProductResponse if product is found', async () => {
            reqStub.params.productId = testId;
            director.get.resolves(productStub);

            await controller.get(reqStub, resStub);

            expect(resStub.json.calledWith(expected)).to.be.true;
        });

        it('should throw an error if error is thrown', async () => {
            reqStub.params.productId = testId;
            director.get.rejects(new Error());

            await controller.get(reqStub, resStub);

            expect(resStub.status.calledWith(500)).to.be.true;
        });

        it('should throw an error if error is an ECOM error and should parse/return correct status', async () => {
            reqStub.params.productId = testId;
            director.get.rejects(new ProductNotFoundError('Product Not Found'));

            await controller.get(reqStub, resStub);

            expect(resStub.status.calledWith(404)).to.be.true;
        });
    });

    describe('Function -> getAll', () => {
        const testId: string = 'test1234';
        it('Should return productResponse if product is found', async () => {
            reqStub.params.productId = testId;
            director.getAll.resolves([productStub]);

            await controller.getAll(reqStub, resStub);

            expect(resStub.json.calledWith([expected])).to.be.true;
        });

        it('should call tracker if error is throw', async () => {
            reqStub.params.productId = testId;
            director.get.rejects(new Error());

            await controller.getAll(reqStub, resStub);

            expect(resStub.status.calledWith(500)).to.be.true;
        });

    });

    describe('Function -> update', () => {
        const testId = 'test1234'
        it('Should return updated Product if order is updated', async () => {
            reqStub.body = {id: testId, name: 'iphone 12'}
            const expected = [
                {
                    id: 'test1234',
                    name: 'iphone 12',
                    description: 'test description',
                    category: PRODUCT_CATEGORY.ELECTRONICS,
                    vendor: 'apple',
                    price: 100,
                    quantity: 10
                }
            ] as unknown as Product[]
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

    describe('Function -> delete', () => {
        const testId: string = 'test1234';
        it('Should return id if product is successfully deleted', async () => {
            reqStub.params.productId = testId;
            const expected = [{id: testId}];
            director.delete.resolves(expected);

            await controller.delete(reqStub, resStub);

            expect(resStub.json.calledWith()).to.be.true;
        });

        it('should parse error and return ', async () => {
            reqStub.params.productId = testId;
            director.delete.rejects(new ProductNotFoundError('Product Not Found'));

            await controller.delete(reqStub, resStub);

            expect(resStub.status.calledWith(404)).to.be.true;
        });

        it('should return 500 status if unhandled error is thrown', async () => {
            reqStub.params.productId = testId;
            director.delete.rejects(new Error());

            await controller.delete(reqStub, resStub);

            expect(resStub.status.calledWith(500)).to.be.true;
        });

    });
});