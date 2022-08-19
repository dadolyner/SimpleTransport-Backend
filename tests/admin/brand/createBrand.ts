// Create new brand TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { BrandModule } from 'src/modules/admin/brand/brand.module'
import { CountryModule } from 'src/modules/admin/country/country.module'
import { BrandDto } from 'src/modules/admin/brand/dto/brand.dto'

export const createBrand = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, BrandModule, CountryModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Create new brand', async () => {
            const existingCountry = await request(app.getHttpServer()).get('/country')
            const countryId = existingCountry.body[0].id

            const newBrand: BrandDto = {
                brand: "Test Brand",
                countryId: countryId
            }

            return request(app.getHttpServer())
                .post('/brand')
                .set('Content-Type', 'application/json')
                .send(newBrand)
                .expect(201)
        })
    })
}