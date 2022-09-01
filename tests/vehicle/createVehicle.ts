// Create Vehicle
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { ColorModule } from 'src/modules/admin/color/color.module'
import { VehicleModule } from 'src/modules/vehicle/vehicle.module'
import { ModelModule } from 'src/modules/admin/model/model.module'
import { FuelModule } from 'src/modules/admin/fuel/fuel.module'
import { VehicleDto } from 'src/modules/vehicle/dto/vehicle.dto'
import { LoginCredentialsDto } from 'src/modules/auth/dto/login.dto'
import { AuthModule } from 'src/modules/auth/auth.module'

export const createVehicle = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, VehicleModule, ColorModule, ModelModule, FuelModule, AuthModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Create new vehicle', async () => {
            const newUser: LoginCredentialsDto = { email: "test.test@test.com", username: null, password: "test12345" }
            const loggedInUser = await request(app.getHttpServer()).post('/auth/login').set('Content-Type', 'application/json').send(newUser)
            const existingModel = await request(app.getHttpServer()).get('/model')
            const existingColor = await request(app.getHttpServer()).get('/color')
            const existingFuel = await request(app.getHttpServer()).get('/fuel')
            const accessToken = loggedInUser.body.accessToken
            const modelId = existingModel.body[0].id
            const colorId = existingColor.body[0].id
            const fuelId = existingFuel.body[0].id

            const newVehicle: VehicleDto = {
                seats: 5,
                shifter: "Manual",
                horsepower: 100,
                torque: 85,
                acceleration: 6.7,
                year: "2021",
                price: 150,
                rent_duration: 3,
                licence_plate: "CEUB676",
                vin: "JH4KA7560NC004288",
                modelId: modelId,
                colorId: colorId,
                fuelId: fuelId,
                imageUrl: "https://test.image.com/exampleImage.png"
            }

            return request(app.getHttpServer())
                .post('/vehicle')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(newVehicle)
                .expect(201)
        })
    })
}