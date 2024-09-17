import { HealthController } from '../../src/health/health-controller';
import { createSandbox, SinonSandbox, SinonStubbedInstance } from 'sinon';
import { HealthResponse } from '../../src/health/health-response';
import { HealthDirector } from '../../src/health/health-director';
import { expect } from 'chai';
import { HEALTH_STATUS } from '../../src/types/enums/health-status';

describe('Health Controller Tests', () => {

    let controller: HealthController;
    let directorStub: SinonStubbedInstance<HealthDirector>;
    let sinonSandbox: SinonSandbox;

    beforeEach(() => {
        sinonSandbox = createSandbox();
        directorStub = sinonSandbox.createStubInstance(HealthDirector);
        controller = new HealthController(<HealthDirector><any>directorStub);
    });

    afterEach(() => {
        sinonSandbox.restore();
    });

    describe('Function -> get', () => {
        it('Should return status of down if director returns down', async () => {
            directorStub.status.returns(Promise.resolve({ status: HEALTH_STATUS.DOWN, db: HEALTH_STATUS.DOWN }));
            const result: HealthResponse = await controller.get();
            expect(result.status).to.equal(HEALTH_STATUS.DOWN);
        });

        it('Should return status of up if director returns up', async () => {
            directorStub.status.returns(Promise.resolve({ status: HEALTH_STATUS.UP, db: HEALTH_STATUS.UP }));
            const result: HealthResponse = await controller.get();
            expect(result.status).to.equal(HEALTH_STATUS.UP);
        });
    });
});