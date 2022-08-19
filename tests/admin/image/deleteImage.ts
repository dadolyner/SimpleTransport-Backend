// Delete existing image TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { ImageModule } from 'src/modules/admin/image/image.module'

export const deleteImage = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, ImageModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Delete image', async () => {
            const existingImage: request.Response = await request(app.getHttpServer()).get('/image')
            const imageId = existingImage.body[0].id

            return request(app.getHttpServer())
                .delete(`/image?id=${imageId}`)
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}