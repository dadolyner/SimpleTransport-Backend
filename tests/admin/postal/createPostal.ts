// Create new postal TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { PostalModule } from 'src/modules/admin/postal/postal.module'
import { PostalDto } from 'src/modules/admin/postal/dto/postal.dto'

export const createPostal = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, PostalModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Create new postal', async () => {
            const newPostal: PostalDto = {
                post_office: "Test Office",
                post_code: "1234"
            }

            return request(app.getHttpServer())
                .post('/postal')
                .set('Content-Type', 'application/json')
                .send(newPostal)
                .expect(201)
        })
    })
}