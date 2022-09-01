// Retrieve places
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { PlaceModule } from 'src/modules/admin/place/place.module'

export const retrievePlaces = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, PlaceModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Retrieve places', async () => {
            return request(app.getHttpServer())
                .get('/place')
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}