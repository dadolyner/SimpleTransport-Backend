// Edit postal
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { PostalModule } from 'src/modules/admin/postal/postal.module'
import { PostalDto } from 'src/modules/admin/postal/dto/postal.dto'

export const editPostal = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, PostalModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Edit postal', async () => {
            const existingPostal: request.Response = await request(app.getHttpServer()).get('/postal')
            const postalId = existingPostal.body[0].id

            const newPostal: PostalDto = {
                post_office: "New Test Office",
                post_code: "4321"
            }

            return request(app.getHttpServer())
                .patch(`/postal?id=${postalId}`)
                .set('Content-Type', 'application/json')
                .send(newPostal)
                .expect(200)
        })
    })
}