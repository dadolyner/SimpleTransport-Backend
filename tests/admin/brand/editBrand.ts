// Edit brand
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { BrandDto } from 'src/modules/admin/brand/dto/brand.dto'
import { BrandModule } from 'src/modules/admin/brand/brand.module'
import { CountryModule } from 'src/modules/admin/country/country.module'

export const editBrand = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, BrandModule, CountryModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Edit brand', async () => {
            const existingBrand = await request(app.getHttpServer()).get('/brand')
            const brandId = existingBrand.body[0].id
            const existingCountry = await request(app.getHttpServer()).get('/country')
            const countryId = existingCountry.body[0].id

            const newBrand: BrandDto = {
                brand: "New Test Brand",
                countryId: countryId
            }

            return request(app.getHttpServer())
                .patch(`/brand?id=${brandId}`)
                .set('Content-Type', 'application/json')
                .send(newBrand)
                .expect(200)
        })
    })
}