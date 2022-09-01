// Retrieve Vehicles
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { ColorModule } from 'src/modules/admin/color/color.module'
import { VehicleModule } from 'src/modules/vehicle/vehicle.module'
import { ModelModule } from 'src/modules/admin/model/model.module'
import { FuelModule } from 'src/modules/admin/fuel/fuel.module'

export const retrieveVehicle = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, VehicleModule, ColorModule, ModelModule, FuelModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Retrieve vehicles', async () => {
            return request(app.getHttpServer())
                .get('/vehicle')
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}