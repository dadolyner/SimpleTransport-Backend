// Delete existing brand TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { BrandModule } from 'src/modules/admin/brand/brand.module'

export const deleteBrand= () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, BrandModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Delete brand', async () => {
            const existingBrand = await request(app.getHttpServer()).get('/brand')
            const brandId = existingBrand.body[0].id
            
            return request(app.getHttpServer())
                .delete(`/brand?id=${brandId}`)
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}