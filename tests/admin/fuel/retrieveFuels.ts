// Retrieve fuels TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { FuelModule } from 'src/modules/admin/fuel/fuel.module'

export const retrieveFuels = () => {
    describe('[FuelController] => Retrieve fuels', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, FuelModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Retrieve fuels', async () => {
            return request(app.getHttpServer())
                .get('/fuel')
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}