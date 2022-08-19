// Create new color TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { ColorDto } from 'src/modules/admin/color/dto/color.dto'
import { ColorModule } from 'src/modules/admin/color/color.module'

export const createColor = () => {
    describe('', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, ColorModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Create new color', async () => {
            const newColor: ColorDto = {
                color: "Test Color"
            }

            return request(app.getHttpServer())
                .post('/color')
                .set('Content-Type', 'application/json')
                .send(newColor)
                .expect(201)
        })
    })
}