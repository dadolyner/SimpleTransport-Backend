// Place Repository
import { Countries } from "src/entities/countries.entity"
import { Places } from "src/entities/places.entity"
import { Postals } from "src/entities/postals.entity"
import { CustomException } from "src/HttpException/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { CreatePlaceDto } from "./dto/create-place.dto"

@EntityRepository(Places)
export class PlaceRepository extends Repository<Places> {

    // Create Place
    async createPlace(placeDto: CreatePlaceDto): Promise<void> {
        const { place, postalId, countryId } = placeDto

        const postalExists = await Postals.findOne({ where: { id: postalId } })
        if (!postalExists) throw CustomException.badRequest(PlaceRepository.name, `Postal with id: ${postalId} does not exist`)
        const countryExists = await Countries.findOne({ where: { id: countryId } })
        if (!countryExists) throw CustomException.badRequest(PlaceRepository.name, `Country with id: ${countryId} does not exist`)
        const placeExists = await this.findOne({ where: { place: place, postalId: postalId, countryId: countryId } })
        if (placeExists) throw CustomException.conflict(PlaceRepository.name, `Place: ${place} already exists`)

        const newPlace = new Places()
        newPlace.place = place
        newPlace.postalId = postalId
        newPlace.countryId = countryId
        newPlace.created_at = new Date()
        newPlace.updated_at = new Date()

        try { await newPlace.save() }
        catch (error) { throw CustomException.internalServerError(PlaceRepository.name, `Adding a place failed!. Reason: ${error.message}`) }

        throw CustomException.created(PlaceRepository.name, `Place: ${place} successfully created!`)
    }

    // Edit Place
    async editPlace(placeId: string, placeDto: CreatePlaceDto): Promise<void> {
        const existingPlace = await this.findOne({ where: { id: placeId } })
        if (!existingPlace) throw CustomException.conflict(PlaceRepository.name, `Place with id: ${placeId} does not exist!`)

        const oldPlace = existingPlace.place
        const { place, postalId, countryId } = placeDto
        existingPlace.place = place
        existingPlace.postalId = postalId
        existingPlace.countryId = countryId
        existingPlace.updated_at = new Date()

        const placeExists = await this.findOne({ where: { place: place } && { postalId: postalId } && { countryId: countryId } })
        if (placeExists) throw CustomException.conflict(PlaceRepository.name, `Place: ${place} with postalId: ${postalId} and countryId: ${countryId} already exists`)

        try { await existingPlace.save() }
        catch (error) { throw CustomException.internalServerError(PlaceRepository.name, `Editing a place failed! Reason: ${error.message}`) }

        throw CustomException.ok(PlaceRepository.name, `Place: ${oldPlace} successfully edited!`)
    }

    // Delete Place
    async deletePlace(placeId: string): Promise<void> {
        const existingPlace = await this.findOne({ where: { id: placeId } })
        if (!existingPlace) throw CustomException.conflict(PlaceRepository.name, `Place with id: ${placeId} does not exist!`)

        try { await this.delete(placeId) }
        catch (error) {throw CustomException.internalServerError(PlaceRepository.name, `Deleting a place failed! Reason: ${error.message}`)}

        throw CustomException.ok(PlaceRepository.name, `Place: ${existingPlace.place} successfully deleted!`)
    }
}