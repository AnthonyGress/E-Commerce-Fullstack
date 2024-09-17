import type { Knex } from 'knex';

const config: Knex.Config = {
    client: 'postgresql',
    connection: {
      database: 'ecommerce_db',
      user: 'ecommerce_user',
      password: process.env.DATABASE_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};

module.exports = config;
