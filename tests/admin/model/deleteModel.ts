// Delete existing model TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { ModelModule } from 'src/modules/admin/model/model.module'

export const deleteModel= () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, ModelModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Delete existing postal', async () => {
            const existingModel = await request(app.getHttpServer()).get('/model')
            const modelId = existingModel.body[0].id
            
            return request(app.getHttpServer())
                .delete(`/model?id=${modelId}`)
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}