import { Knex } from 'knex';
import { HealthResponse } from './health-response';
import { HEALTH_STATUS } from '../types/enums/health-status';


export class HealthDirector {
    private readonly dbClient: Knex;
    constructor(dbClient: Knex) {
        this.dbClient = dbClient;
    }

    async status(): Promise<HealthResponse> {
        try {
            await this.dbClient.raw('select version()');
            return { status: HEALTH_STATUS.UP, db: HEALTH_STATUS.UP };
        } catch (error) {
            console.log(error);
            return { status: HEALTH_STATUS.DOWN };
        }
    }
}