import { expect } from 'chai';
import { SinonSandbox, SinonSpy, SinonStubbedInstance, createSandbox } from 'sinon';
import { ProductDirector } from '../../src/product/product-director';
import { ProductRequest } from '../../src/product/product-request';
import { Product } from '../../src/product/product';
import { EcomError } from '../../src/error/ecommerce-error';
import { PRODUCT_CATEGORY } from '../../src/types/enums/product-category';
import { ProductNotFoundError } from '../../src/error/product-not-found-error';
import { ProductDao } from '../../src/product/product-dao';

describe('Product Director Tests', () => {

    const productId: string = 'test-uuid';
    let director: ProductDirector;
    let daoStub: SinonStubbedInstance<ProductDao>;
    let productStub: Product;
    let productRequest: ProductRequest;
    let sinonSandbox: SinonSandbox;

    beforeEach(() => {
        sinonSandbox = createSandbox();
        daoStub = sinonSandbox.createStubInstance(ProductDao);
        director = new ProductDirector(daoStub);

        productRequest = {
            name: 'iphone',
            description: 'test description',
            category: 'electronics' as PRODUCT_CATEGORY,
            vendor: 'apple',
            price: 100,
            quantity: 10
        };

        productStub = {
            id: 'test-uuid',
            name: 'iphone',
            description: 'test description',
            category: PRODUCT_CATEGORY.ELECTRONICS,
            vendor: 'apple',
            price: 100,
            quantity: 10
        };
    });

    afterEach(() => {
        sinonSandbox.restore();
    });

    describe('Function -> create', () => {
        it('Should throw an error if product dao get throws error', async () => {
            let expected: EcomError = undefined as any;
            daoStub.insert.rejects(new EcomError('ECOM-500-1', 'error'));
            try {
                await director.create(productRequest);
            } catch (error: any) {
                expected = error;
            }

            expect(expected).to.not.be.undefined;
            expect(expected.code).to.equal('ECOM-500-1');
            expect(expected.message).to.equal('error');
        });

        it('Should call dao insert', async () => {
            await director.create(productStub);
            expect(daoStub.insert.called).to.be.true;
        });
    });

    describe('Function -> get', () => {
        it('Should throw Product not found error if no product is found', async () => {
            let expected: any;
            daoStub.get.rejects(new ProductNotFoundError('not found'));

            try {
                await director.get(productId);
            } catch (error) {
                expected = error;
            }

            expect(expected).to.not.be.undefined
            expect(expected.code).to.equal('ECOM-404-1');
            expect(expected.message).to.equal('not found');
        });
    });

    describe('Function -> getAll', () => {
        it('Should call dao getAll', async () => {
            await director.getAll();
            expect(daoStub.getAll.called).to.be.true;
        });
    });

    describe('Function -> update', () => {
        const productId: string = 'test-uuid';

        it('Should call dao update', async () => {
            await director.update({ id: productId, name: 'update name' });


            expect(daoStub.update.called).to.be.true;
            expect(daoStub.update.calledWith({ id: productId, name: 'update name' })).to.be.true;
        });
    });

    describe('Function -> delete', () => {

        it('Should call dao delete', async () => {
            daoStub.delete.resolves([{id: 'productId'}]);

            await director.delete(productId);

            expect(daoStub.delete.calledOnce).to.be.true;
            expect(daoStub.delete.calledWith(productId)).to.be.true;
        });
    });
});