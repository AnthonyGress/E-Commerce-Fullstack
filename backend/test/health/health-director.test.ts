import { createSandbox, SinonSandbox, SinonStubbedInstance } from 'sinon';
import { HealthResponse } from '../../src/health/health-response';
import { HealthDirector } from '../../src/health/health-director';
import { expect } from 'chai';
import knex, { Knex } from 'knex';

describe('Health Director Tests', () => {

    let director: HealthDirector;
    let dao: SinonStubbedInstance<Knex.Client>;
    let sinonSandbox: SinonSandbox;

    beforeEach(() => {
        sinonSandbox = createSandbox();
        dao = sinonSandbox.createStubInstance(knex.Client);
        director = new HealthDirector(<Knex><any>dao);
    });

    afterEach(() => {
        sinonSandbox.restore();
    });

    describe('Function -> status', () => {
        it('Should return status of down if db query fails', async () => {
            dao.raw.rejects(new Error('error'));
            const result: HealthResponse = await director.status();
            expect(result.status).to.equal('down');
        });

        it('Should return status of up if db query succeeds', async () => {
            dao.raw.resolves();
            const result: HealthResponse = await director.status();
            expect(result.status).to.equal('up');
        });
    });
});