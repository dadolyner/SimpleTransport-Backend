// Delete existing fuel TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { FuelModule } from 'src/modules/admin/fuel/fuel.module'

export const deleteFuel = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, FuelModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Delete existing fuel', async () => {
            const existingFuel: request.Response = await request(app.getHttpServer()).get('/fuel')
            const fuelId = existingFuel.body[0].id

            return request(app.getHttpServer())
                .delete(`/fuel?id=${fuelId}`)
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}