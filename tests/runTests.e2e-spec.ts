import { createColor } from "./admin/color/createColor"
import { deleteColor } from "./admin/color/deleteColor"
import { editColor } from "./admin/color/editColor"
import { retrieveColors } from "./admin/color/retrieveColors"
import { createCountry } from "./admin/country/createCountry"
import { deleteCountry } from "./admin/country/deleteCountry"
import { editCountry } from "./admin/country/editCountry"
import { retrieveCountries } from "./admin/country/retrieveCountries"
import { createFuel } from "./admin/fuel/createFuel"
import { deleteFuel } from "./admin/fuel/deleteFuel"
import { editFuel } from "./admin/fuel/editFuel"
import { retrieveFuels } from "./admin/fuel/retrieveFuels"
import { createImage } from "./admin/image/createImage"
import { deleteImage } from "./admin/image/deleteImage"
import { editImage } from "./admin/image/editImage"
import { retrieveImages } from "./admin/image/retrieveImages"
import { createPlace } from "./admin/place/createPlace"
import { deletePlace } from "./admin/place/deletePlace"
import { editPlace } from "./admin/place/editPlace"
import { retrievePlaces } from "./admin/place/retrievePlaces"
import { createPostal } from "./admin/postal/createPostal"
import { deletePostal } from "./admin/postal/deletePostal"
import { editPostal } from "./admin/postal/editPostal"
import { retrievePostals } from "./admin/postal/retrievePostals"

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

    // Delete all created data
    describe('Data Cleanup', () => {
        deleteColor()
        deleteFuel()
        deleteImage()
        deletePlace()
        deleteCountry()
        deletePostal()
    })
})
