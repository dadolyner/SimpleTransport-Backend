// Delete existing postal TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { PostalModule } from 'src/modules/admin/postal/postal.module'

export const deletePostal = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, PostalModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Delete postal', async () => {
            const existingPostal: request.Response = await request(app.getHttpServer()).get('/postal')
            const postalId = existingPostal.body[0].id

            return request(app.getHttpServer())
                .delete(`/postal?id=${postalId}`)
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}