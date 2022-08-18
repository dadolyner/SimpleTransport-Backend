// Create new country TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { CountryModule } from 'src/modules/admin/country/country.module'
import { CountryDto } from 'src/modules/admin/country/dto/country.dto'

export const createCountry = () => {
    describe('[CountryController] => Create new country', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, CountryModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Create new country', async () => {
            const newCountry: CountryDto = {
                country: "Slovenia",
                abbreviation: "SLO"
            }

            return request(app.getHttpServer())
                .post('/country')
                .set('Content-Type', 'application/json')
                .send(newCountry)
                .expect(201)
        })
    })
}