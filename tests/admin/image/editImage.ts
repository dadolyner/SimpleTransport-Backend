// Edit existing image TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { ImageModule } from 'src/modules/admin/image/image.module'
import { ImageDto } from 'src/modules/admin/image/dto/image.dto'

export const editImage = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, ImageModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Edit image', async () => {
            const existingImage: request.Response = await request(app.getHttpServer()).get('/image')
            const imageId = existingImage.body[0].id

            const newImage: ImageDto = {
                url: "https://www.testsite.com/images/new_test_image.png",
            }

            return request(app.getHttpServer())
                .patch(`/image?id=${imageId}`)
                .set('Content-Type', 'application/json')
                .send(newImage)
                .expect(200)
        })
    })
}