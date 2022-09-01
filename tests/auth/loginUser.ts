// Login user
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { AuthModule } from 'src/modules/auth/auth.module'
import { LoginCredentialsDto } from 'src/modules/auth/dto/login.dto'

export const loginUser = () => {
    let accessToken: string
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, AuthModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Login user', async () => {
            const newUser: LoginCredentialsDto = {
                email: "test.test@test.com",
                username: null,
                password: "test12345"
            }

            return request(app.getHttpServer())
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send(newUser)
                .expect(201)
        })
    })
}