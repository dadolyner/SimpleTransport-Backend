// Create Rental
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { VehicleModule } from 'src/modules/vehicle/vehicle.module'
import { LoginCredentialsDto } from 'src/modules/auth/dto/login.dto'
import { AuthModule } from 'src/modules/auth/auth.module'
import { RentalDto } from 'src/modules/rental/dto/rental.dto'
import { RentalModule } from 'src/modules/rental/rental.module'

export const createRental = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, RentalModule, VehicleModule, AuthModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Create new rental', async () => {
            const newUser: LoginCredentialsDto = { email: "test.test@test.com", username: null, password: "test12345" }
            const loggedInUser = await request(app.getHttpServer()).post('/auth/login').set('Content-Type', 'application/json').send(newUser)
            const existingVehicle = await request(app.getHttpServer()).get('/vehicle')
            const accessToken = loggedInUser.body.accessToken
            const vehicleId = existingVehicle.body[0].vehicle.id
            
            const newRental: RentalDto = {
                rent_start: "2022-10-01T12:21",
                rent_end: "2022-10-02T12:21",
                vehicleId: vehicleId
            }

            return request(app.getHttpServer())
                .post('/rental')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(newRental)
                .expect(201)
        })
    })
}