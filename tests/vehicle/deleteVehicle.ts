// Delete vehicle
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { VehicleModule } from 'src/modules/vehicle/vehicle.module'
import { LoginCredentialsDto } from 'src/modules/auth/dto/login.dto'

export const deleteVehicle = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, VehicleModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Delete vehicle', async () => {
            const newUser: LoginCredentialsDto = { email: "test.test@test.com", username: null, password: "test12345" }
            const loggedInUser = await request(app.getHttpServer()).post('/auth/login').set('Content-Type', 'application/json').send(newUser)
            const existingVehicle = await request(app.getHttpServer()).get('/vehicle')
            const accessToken = loggedInUser.body.accessToken
            const vehicleId = existingVehicle.body[0].vehicle.id
            
            return request(app.getHttpServer())
                .delete(`/vehicle?id=${vehicleId}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200)
        })
    })
}