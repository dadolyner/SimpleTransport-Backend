// Retrieve colors TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { ColorModule } from 'src/modules/admin/color/color.module'

export const retrieveColors = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, ColorModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Retrieve colors', async () => {
            return request(app.getHttpServer())
                .get('/color')
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}