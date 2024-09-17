import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('product', (table: Knex.TableBuilder) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).unique().primary();
        table.text('name').notNullable();
        table.text('description').nullable();
        table.enum('category', ['electronics', 'clothing', 'other']).notNullable();
        table.text('vendor').notNullable();
        table.bigint('price').notNullable();
        table.bigint('quantity').notNullable();
    });

    await knex.schema.createTable('order', (table: Knex.TableBuilder) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).unique().primary();
        table.bigint('amount').notNullable();
        table.enum('order_status', ['processing', 'dispatched,', 'in_transit', 'delivered', 'cancelled', 'undeliverable']).notNullable();
        table.specificType('order_items', 'text ARRAY').notNullable();
        table.text('account_id').notNullable();
        table.text('tracking_company').nullable();
        table.text('tracking_number').nullable();
    });

    await knex.schema.createTable('order_item', (table: Knex.TableBuilder) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).unique().primary();
        table.uuid('product').notNullable();
        table.bigint('price').notNullable();
        table.bigint('quantity').notNullable();
    });

    await knex.schema.createTable('account', (table: Knex.TableBuilder) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary().unique();
        table.text('email').notNullable();
        table.text('first_name').notNullable();
        table.text('last_name').notNullable();
        table.text('phone').notNullable();
        table.text('billing_address1').notNullable();
        table.text('billing_address2').nullable();
        table.text('billing_city').notNullable();
        table.text('billing_state').notNullable();
        table.text('billing_zip').notNullable();
        table.text('billing_country').notNullable();
        table.specificType('orders', 'text ARRAY').notNullable();
    });

    await knex.schema.table('order_item', (table: Knex.TableBuilder) => {
        table.foreign('product').references('id').inTable('product');
    });

}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('order');
    await knex.schema.dropTableIfExists('order_item');
    await knex.schema.dropTableIfExists('account');
    await knex.schema.dropTableIfExists('product');
}