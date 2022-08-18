// Create new fuel TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { FuelModule } from 'src/modules/admin/fuel/fuel.module'
import { FuelDto } from 'src/modules/admin/fuel/dto/fuel.dto'

export const createFuel = () => {
    describe('[FuelController] => Create new fuel', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, FuelModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Create new fuel', async () => {
            const newFuel: FuelDto = {
                fuel: "Diesel"
            }

            return request(app.getHttpServer())
                .post('/fuel')
                .set('Content-Type', 'application/json')
                .send(newFuel)
                .expect(201)
        })
    })
}