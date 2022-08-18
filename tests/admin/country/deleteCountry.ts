// Delete existing country TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { CountryModule } from 'src/modules/admin/country/country.module'

export const deleteCountry = () => {
    describe('[CountryController] => Delete existing country', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, CountryModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Edit existing country', async () => {
            const existingCountry: request.Response = await request(app.getHttpServer()).get('/country')
            const countryId = existingCountry.body[0].id

            return request(app.getHttpServer())
                .delete(`/country?id=${countryId}`)
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}