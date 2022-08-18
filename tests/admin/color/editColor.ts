// Edit existing color TEST
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmTestConfig } from 'src/config/test-config.typeorm'
import { ColorDto } from 'src/modules/admin/color/dto/color.dto'
import { ColorModule } from 'src/modules/admin/color/color.module'

export const editColor = () => {
    describe('[ColorController] => Edit existing color', () => {
        let app: INestApplication

        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig, ColorModule] }).compile()
            app = moduleFixture.createNestApplication()
            await app.init()
        })

        afterAll(async () => { await app.close() })

        it('Edit existing color', async () => {
            const existingColor: request.Response = await request(app.getHttpServer()).get('/color')
            const colorId = existingColor.body[0].id

            const newColor: ColorDto = {
                color: "Formula Red"
            }

            return request(app.getHttpServer())
                .patch(`/color?id=${colorId}`)
                .set('Content-Type', 'application/json')
                .send(newColor)
                .expect(200)
        })
    })
}