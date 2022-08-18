// Edit existing image TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { PostalModule } from 'src/modules/admin/postal/postal.module'
import { PlaceModule } from 'src/modules/admin/place/place.module'
import { CountryModule } from 'src/modules/admin/country/country.module'
import { PlaceDto } from 'src/modules/admin/place/dto/place.dto'

export const editPlace = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, PlaceModule, PostalModule, CountryModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Edit existing place', async () => {
            const existingPlace: request.Response = await request(app.getHttpServer()).get('/place')
            const placeId = existingPlace.body[0].id
            const existingPostal = await request(app.getHttpServer()).get('/postal')
            const postalId = existingPostal.body[0].id
            const existingCountry = await request(app.getHttpServer()).get('/country')
            const countryId = existingCountry.body[0].id

            const newPlace: PlaceDto = {
                place: "Edited Test",
                postalId: postalId,
                countryId: countryId 
            }

            return request(app.getHttpServer())
                .patch(`/place?id=${placeId}`)
                .set('Content-Type', 'application/json')
                .send(newPlace)
                .expect(200)
        })
    })
}