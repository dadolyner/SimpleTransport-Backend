// Retrieve Rentals
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { RentalModule } from 'src/modules/rental/rental.module'

export const retrieveRentals = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, RentalModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Retrieve rentals', async () => {
            return request(app.getHttpServer())
                .get('/rental')
                .set('Content-Type', 'application/json')
                .expect(200)
        })
    })
}