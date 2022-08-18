// Retrieve images TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { ImageModule } from 'src/modules/admin/image/image.module'

export const retrieveImages = () => {
    describe('[ImageController] => Retrieve images', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, ImageModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Retrieve images', async () => {
            return request(app.getHttpServer())
                .get('/image')
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}