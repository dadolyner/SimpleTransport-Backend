// Edit existing fuel TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { FuelModule } from 'src/modules/admin/fuel/fuel.module'
import { FuelDto } from 'src/modules/admin/fuel/dto/fuel.dto'

export const editFuel = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, FuelModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Edit fuel', async () => {
            const existingFuel: request.Response = await request(app.getHttpServer()).get('/fuel')
            const fuelId = existingFuel.body[0].id

            const newFuel: FuelDto = {
                fuel: "New Test Fuel"
            }

            return request(app.getHttpServer())
                .patch(`/fuel?id=${fuelId}`)
                .set('Content-Type', 'application/json')
                .send(newFuel)
                .expect(200)
        })
    })
}