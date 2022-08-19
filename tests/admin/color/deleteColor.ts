// Delete existing color TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { ColorModule } from 'src/modules/admin/color/color.module'

export const deleteColor = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, ColorModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Delete color', async () => {
            const existingColor: request.Response = await request(app.getHttpServer()).get('/color')
            const colorId = existingColor.body[0].id

            return request(app.getHttpServer())
                .delete(`/color?id=${colorId}`)
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}