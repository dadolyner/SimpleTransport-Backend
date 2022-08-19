// Create new image TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { ImageModule } from 'src/modules/admin/image/image.module'
import { ImageDto } from 'src/modules/admin/image/dto/image.dto'

export const createImage = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, ImageModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Create new image', async () => {
            const newImage: ImageDto = {
                url: "https://www.testsite.com/images/test_image.png",
            }

            return request(app.getHttpServer())
                .post('/image')
                .set('Content-Type', 'application/json')
                .send(newImage)
                .expect(201)
        })
    })
}