// Create new image TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { PlaceModule } from 'src/modules/admin/place/place.module'
import { PlaceDto } from 'src/modules/admin/place/dto/place.dto'
import { PostalModule } from 'src/modules/admin/postal/postal.module'
import { CountryModule } from 'src/modules/admin/country/country.module'

export const createPlace = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, PlaceModule, PostalModule, CountryModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Create new place', async () => {
            const existingPostal = await request(app.getHttpServer()).get('/postal')
            const postalId = existingPostal.body[0].id
            const existingCountry = await request(app.getHttpServer()).get('/country')
            const countryId = existingCountry.body[0].id

            const newPlace: PlaceDto = {
                place: "Test",
                postalId: postalId,
                countryId: countryId 
            }

            return request(app.getHttpServer())
                .post('/place')
                .set('Content-Type', 'application/json')
                .send(newPlace)
                .expect(201)
        })
    })
}