// Retrieve countries TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { CountryModule } from 'src/modules/admin/country/country.module'

export const retrieveCountries = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, CountryModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Retrieve countries', async () => {
            return request(app.getHttpServer())
                .get('/country')
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}