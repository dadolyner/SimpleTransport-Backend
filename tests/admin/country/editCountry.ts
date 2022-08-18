// Edit existing country TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { CountryModule } from 'src/modules/admin/country/country.module'
import { CountryDto } from 'src/modules/admin/country/dto/country.dto'

export const editCountry = () => {
    describe('[CountryController] => Edit existing country', () => {
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

            const newCountry: CountryDto = {
                country: "Italia",
                abbreviation: "I"
            }

            return request(app.getHttpServer())
                .patch(`/country?id=${countryId}`)
                .set('Content-Type', 'application/json')
                .send(newCountry)
                .expect(200)
        })
    })
}