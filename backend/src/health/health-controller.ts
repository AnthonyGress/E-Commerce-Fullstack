import { HealthDirector } from './health-director';
import { HealthResponse } from './health-response';

export class HealthController {
    private readonly director: HealthDirector;
    constructor(director: HealthDirector) {
        this.director = director;
    }

    async get(): Promise<HealthResponse> {
        return await this.director.status();
    }
}