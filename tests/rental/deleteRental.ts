// Delete Rental
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { LoginCredentialsDto } from 'src/modules/auth/dto/login.dto'
import { RentalModule } from 'src/modules/rental/rental.module'

export const deleteRental = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, RentalModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Delete rental', async () => {
            const newUser: LoginCredentialsDto = { email: "test.test@test.com", username: null, password: "test12345" }
            const loggedInUser = await request(app.getHttpServer()).post('/auth/login').set('Content-Type', 'application/json').send(newUser)
            const existingRental = await request(app.getHttpServer()).get('/rental')
            const accessToken = loggedInUser.body.accessToken
            const rentalId = existingRental.body[0].id

            return request(app.getHttpServer())
                .post(`/rental?id=${rentalId}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200)
        })
    })
}