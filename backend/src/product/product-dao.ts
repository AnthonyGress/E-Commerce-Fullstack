import { Knex } from 'knex';
import { ProductNotFoundError } from '../error/product-not-found-error';
import { Product } from './product';
import { ProductDeleteResponse } from './product-delete-response';

export class ProductDao {
    private readonly dbClient: Knex<Product>;
    private readonly table: string = 'product';
    constructor(dbClient: Knex<Product>) {
        this.dbClient = dbClient;
    }

    public async insert(product: Product): Promise<string> {
        const entity: Product = this.toEntity(product);
        const result: { id: string }[] = await this.dbClient.table(this.table).insert<Product>([entity]).returning('id');
        return result[0].id;
    }

    public async get(productId: string): Promise<Product> {
        const entity: { rows: Product[] } = await this.dbClient.raw(`select p.*
        from product p where p.id = '${productId}'`);
        if (entity.rows.length === 0) {
            throw new ProductNotFoundError('No product found for id');
        }
        return this.toProduct(entity.rows[0]);
    }

    public async getAll(): Promise<Product[]> {
        const products: Product[] = await this.dbClient.table(this.table).select<Product[]>('*');
        return products.map(this.toProduct);
    }

    public async update(product: Partial<Product>): Promise<Product[]> {
        const entity: Product = this.toEntity(product as Product);
        // remove undefined keys
        Object.keys(entity).forEach(key => entity[key] === undefined && delete entity[key]);
        // update only the updated product properties
        const updateResponse = await this.dbClient.table(this.table).update(entity).where('id', product.id).returning('*');
        if (updateResponse.length === 0) {
            throw new ProductNotFoundError('No product found for id');
        }
        return updateResponse;
    }

    public async delete(productId: string): Promise<ProductDeleteResponse[]> {
        console.info(`deleting product ${productId}`);
        const deleteResponse = await this.dbClient.table(this.table).delete().where('id', productId).returning('id');
        console.info('delete res', deleteResponse);

        if (deleteResponse.length === 0) {
            throw new ProductNotFoundError('No product found for id');
        }
        return deleteResponse;
    }

    private toEntity(product: Product): Product {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            category: product.category,
            vendor: product.vendor,
            price: product.price,
            quantity: product.quantity
        };
    }

    private toProduct(entity: Product): Product {
        const product: Product = new Product(entity.id, entity.name, entity.description, entity.category, entity.vendor, entity.price, entity.quantity);

        return product;
    }
}
