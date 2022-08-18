// Delete existing postal TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { PlaceModule } from 'src/modules/admin/place/place.module'

export const deletePlace = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, PlaceModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Delete existing place', async () => {
            const existingPostal: request.Response = await request(app.getHttpServer()).get('/place')
            const postalId = existingPostal.body[0].id

            return request(app.getHttpServer())
                .delete(`/place?id=${postalId}`)
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}