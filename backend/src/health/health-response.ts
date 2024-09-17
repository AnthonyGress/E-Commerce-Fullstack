import { HEALTH_STATUS } from '../types/enums/health-status';

export type HealthResponse = {
    status: HEALTH_STATUS;
    db?: HEALTH_STATUS;
}