// Place Repository
import { Countries } from "src/entities/countries.entity"
import { Places } from "src/entities/places.entity"
import { Postals } from "src/entities/postals.entity"
import { CustomException } from "src/helpers/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { PlaceDto } from "./dto/place.dto"

@EntityRepository(Places)
export class PlaceRepository extends Repository<Places> {

    // Create Place
    async createPlace(placeDto: PlaceDto): Promise<void> {
        const { place, postalId, countryId } = placeDto

        const postalExists = await Postals.findOne({ where: { id: postalId } })
        if (!postalExists) throw CustomException.badRequest(PlaceRepository.name, `Provided postal does not exist.`)
        const countryExists = await Countries.findOne({ where: { id: countryId } })
        if (!countryExists) throw CustomException.badRequest(PlaceRepository.name, `Provided country does not exist.`)
        const existingPlace = await this.findOne({ where: { place: place, postalId: postalId, countryId: countryId } })
        if (existingPlace) throw CustomException.conflict(PlaceRepository.name, `Place ${place} already exists.`)

        const newPlace = new Places()
        newPlace.place = place
        newPlace.postalId = postalId
        newPlace.countryId = countryId
        newPlace.created_at = new Date()
        newPlace.updated_at = new Date()

        try { await newPlace.save() }
        catch (error) { throw CustomException.internalServerError(PlaceRepository.name, `Adding a place failed. Reason: ${error.message}.`) }

        throw CustomException.created(PlaceRepository.name, `Place ${place} successfully created.`)
    }

    // Edit Place
    async editPlace(placeId: string, placeDto: PlaceDto): Promise<void> {
        const { place, postalId, countryId } = placeDto
        
        const postalExists = await Postals.findOne({ where: { id: postalId } })
        if (!postalExists) throw CustomException.badRequest(PlaceRepository.name, `Provided postal does not exist.`)
        const countryExists = await Countries.findOne({ where: { id: countryId } })
        if (!countryExists) throw CustomException.badRequest(PlaceRepository.name, `Provided country does not exist.`)
        const existingPlace = await this.findOne({ where: { id: placeId } })
        if (!existingPlace) throw CustomException.badRequest(PlaceRepository.name, `Provided place does not exist.`)
        const placeExists = await this.findOne({ where: { place: place, postalId: postalId, countryId: countryId } })
        if (placeExists) throw CustomException.conflict(PlaceRepository.name, `Place ${place} already exists.`)
        
        const oldPlace = existingPlace.place
        existingPlace.place = place
        existingPlace.postalId = postalId
        existingPlace.countryId = countryId
        existingPlace.updated_at = new Date()

        try { await existingPlace.save() }
        catch (error) { throw CustomException.internalServerError(PlaceRepository.name, `Editing a place failed. Reason: ${error.message}.`) }

        throw CustomException.ok(PlaceRepository.name, `Place ${oldPlace} successfully edited.`)
    }

    // Delete Place
    async deletePlace(placeId: string): Promise<void> {
        const existingPlace = await this.findOne({ where: { id: placeId } })
        if (!existingPlace) throw CustomException.badRequest(PlaceRepository.name, `Provided place does not exist.`)

        try { await this.delete(placeId) }
        catch (error) {throw CustomException.internalServerError(PlaceRepository.name, `Deleting a place failed. Reason: ${error.message}.`)}

        throw CustomException.ok(PlaceRepository.name, `Place ${existingPlace.place} successfully deleted.`)
    }
}