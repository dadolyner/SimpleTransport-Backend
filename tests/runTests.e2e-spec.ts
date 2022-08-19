import { Test, TestingModule } from "@nestjs/testing"
import { TypeOrmTestConfig } from "src/config/test-config.typeorm"
import { INestApplication } from "@nestjs/common"
import { ClearTables } from "./helpers/ClearTables"

import { createBrand } from "./admin/brand/createBrand"
import { retrieveBrands } from "./admin/brand/retrieveBrand"
import { editBrand } from "./admin/brand/editBrand"

import { createColor } from "./admin/color/createColor"
import { retrieveColors } from "./admin/color/retrieveColors"
import { editColor } from "./admin/color/editColor"

import { createCountry } from "./admin/country/createCountry"
import { retrieveCountries } from "./admin/country/retrieveCountries"
import { editCountry } from "./admin/country/editCountry"

import { createFuel } from "./admin/fuel/createFuel"
import { retrieveFuels } from "./admin/fuel/retrieveFuels"
import { editFuel } from "./admin/fuel/editFuel"

import { createImage } from "./admin/image/createImage"
import { retrieveImages } from "./admin/image/retrieveImages"
import { editImage } from "./admin/image/editImage"

import { createModel } from "./admin/model/createModel"
import { retrieveModels } from "./admin/model/retrieveModel"
import { editModel } from "./admin/model/editModel"

import { createPlace } from "./admin/place/createPlace"
import { retrievePlaces } from "./admin/place/retrievePlaces"
import { editPlace } from "./admin/place/editPlace"

import { createPostal } from "./admin/postal/createPostal"
import { retrievePostals } from "./admin/postal/retrievePostals"
import { editPostal } from "./admin/postal/editPostal"

import { createUser } from "./auth/createUser"
import { loginUser } from "./auth/loginUser"

describe('Start running tests', () => {
    // Color
    describe('[ColorController] => Running color tests', () => {
        createColor()
        retrieveColors()
        editColor()
    })

    // Country
    describe('[CountryController] => Running country tests', () => {
        createCountry()
        retrieveCountries()
        editCountry()
    })

    // Brand
    describe('[BrandController] => Running brand tests', () => {
        createBrand()
        retrieveBrands()
        editBrand()
    })

    // Model
    describe('[ModelController] => Running model tests', () => {
        createModel()
        retrieveModels()
        editModel()
    })

    // Fuel
    describe('[FuelController] => Running fuel tests', () => {
        createFuel()
        retrieveFuels()
        editFuel()
    })

    // Image
    describe('[ImageController] => Running image tests', () => {
        createImage()
        retrieveImages()
        editImage()
    })

    // Postal
    describe('[PostalController] => Running postal tests', () => {
        createPostal()
        retrievePostals()
        editPostal()
    })

    // Place
    describe('[PlaceController] => Running place tests', () => {
        createPlace()
        retrievePlaces()
        editPlace()
    })

    // Auth
    describe('[AuthController] => Running auth tests', () => {
        createUser()
        loginUser()
    })

    // Trunc tables
    afterAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TypeOrmTestConfig] }).compile()
        const app: INestApplication = moduleFixture.createNestApplication()
        await app.init()
        await ClearTables()
        await app.close()
    })
})
