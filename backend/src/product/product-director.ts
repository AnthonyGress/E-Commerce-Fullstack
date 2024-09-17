
import { Product } from './product';
import { ProductDao } from './product-dao';
import { ProductDeleteResponse } from './product-delete-response';
import { ProductRequest } from './product-request';
import { v4 } from 'uuid';

export class ProductDirector {
    private readonly dao: ProductDao;

    constructor(dao: ProductDao) {
        this.dao = dao;
    }

    public async create(productRequest: ProductRequest): Promise<string> {
        const newProduct: Product = {
            id: v4(),
            name: productRequest.name,
            description: productRequest.description,
            category: productRequest.category,
            quantity: productRequest.quantity,
            price: productRequest.price,
            vendor: productRequest.vendor
        };
        return await this.dao.insert(newProduct);
    }

    public async get(productId: string): Promise<Product> {
        return await this.dao.get(productId);
    }

    public async getAll(): Promise<Product[]> {
        console.info('Getting all products');
        return await this.dao.getAll();
    }

    public async update(product: Partial<Product>): Promise<Product[]> {
        return await this.dao.update(product);
    }

    public async delete(productId: string): Promise<ProductDeleteResponse[]> {
        return await this.dao.delete(productId);
    }
}
