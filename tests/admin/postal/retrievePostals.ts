// Retrieve postals
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { PostalModule } from 'src/modules/admin/postal/postal.module'

export const retrievePostals = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, PostalModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Retrieve postals', async () => {
            return request(app.getHttpServer())
                .get('/postal')
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}