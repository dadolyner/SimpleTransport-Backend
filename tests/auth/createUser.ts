// Create new user TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { SignupCredentialsDto } from 'src/modules/auth/dto/signup.dto'
import { AuthModule } from 'src/modules/auth/auth.module'
import { PlaceModule } from 'src/modules/admin/place/place.module'

export const createUser = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, AuthModule, PlaceModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Create new user', async () => {
            const existingPlace = await request(app.getHttpServer()).get('/place')
            const placeId = existingPlace.body[0].id

            const newUser: SignupCredentialsDto = {
                first_name: "Test",
                last_name: "Test",
                email: "test.test@test.com",
                username: "testuser",
                password: "test12345",
                placeId: placeId,
            }

            return request(app.getHttpServer())
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(newUser)
                .expect(201)
        })
    })
}