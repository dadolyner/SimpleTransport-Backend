// Create model
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { BrandModule } from 'src/modules/admin/brand/brand.module'
import { ModelModule } from 'src/modules/admin/model/model.module'
import { ModelDto } from 'src/modules/admin/model/dto/model.dto'

export const createModel = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, ModelModule, BrandModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Create new model', async () => {
            const existingBrand = await request(app.getHttpServer()).get('/brand')
            const brandId = existingBrand.body[0].id

            const newModel: ModelDto = {
                model: "Test Model",
                brandId: brandId
            }

            return request(app.getHttpServer())
                .post('/model')
                .set('Content-Type', 'application/json')
                .send(newModel)
                .expect(201)
        })
    })
}