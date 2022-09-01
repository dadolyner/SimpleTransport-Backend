// Retrieve brands
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { BrandModule } from 'src/modules/admin/brand/brand.module'

export const retrieveBrands = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, BrandModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Retrieve brands', async () => {
            return request(app.getHttpServer())
                .get('/brand')
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}