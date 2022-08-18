// Run all test Sequentially
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmTestConfig } from "src/config/test-config.typeorm";
import { createColor } from "./admin/color/createColor";
import { deleteColor } from "./admin/color/deleteColor";
import { editColor } from "./admin/color/editColor";
import { retrieveColors } from "./admin/color/retrieveColors";
import { ClearTables } from "./helpers/ClearTables";


describe('Running tests on testing database', () => {
    // Admin
    // Color
    retrieveColors()
    createColor()
    editColor()
    deleteColor()

    afterAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig] }).compile()
        const app: INestApplication = moduleFixture.createNestApplication()
        await app.init()
        await ClearTables()
        await app.close()
    })
})