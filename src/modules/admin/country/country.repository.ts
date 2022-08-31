// Country Repository
import { Countries } from "src/entities/countries.entity"
import { CustomException } from "src/helpers/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { CountryDto } from "./dto/country.dto"

@EntityRepository(Countries)
export class CountryRepository extends Repository<Countries> {

    // Create Country
    async createCountry(countryDto: CountryDto): Promise<void> {
        const { country, abbreviation } = countryDto

        const countryExists = await this.findOne({ where: { country: country } })
        if (countryExists) throw CustomException.conflict(CountryRepository.name, `Country ${country} already exists.`)

        const newCountry = new Countries()
        newCountry.country = country
        newCountry.abbreviation = abbreviation
        newCountry.created_at = new Date()
        newCountry.updated_at = new Date()

        try { await newCountry.save() }
        catch (error) { throw CustomException.internalServerError(CountryRepository.name, `Adding a country failed. Reason: ${error.message}.`) }

        throw CustomException.created(CountryRepository.name, `Country ${country} successfully created.`)
    }

    // Edit Country
    async editCountry(countryId: string, countryDto: CountryDto): Promise<void> {
        const { country, abbreviation } = countryDto
        
        const existingCountry = await this.findOne({ where: { id: countryId } })
        if (!existingCountry) throw CustomException.badRequest(CountryRepository.name, `Provided country does not exist.`)
        const countryExists = await this.findOne({ where: { country: country } })
        if (countryExists && countryId !== countryExists.id) throw CustomException.conflict(CountryRepository.name, `Country ${country} already exists.`)

        const oldCountry = existingCountry.country
        existingCountry.country = country
        existingCountry.abbreviation = abbreviation
        existingCountry.updated_at = new Date()

        try { await existingCountry.save() }
        catch (error) { throw CustomException.internalServerError(CountryRepository.name, `Editing a country failed. Reason: ${error.message}.`) }

        throw CustomException.ok(CountryRepository.name, `Country ${oldCountry} successfully edited.`)
    }

    // Delete Country
    async deleteCountry(countryId: string): Promise<void> {
        const existingCountry = await this.findOne({ where: { id: countryId } })
        if (!existingCountry) throw CustomException.badRequest(CountryRepository.name, `Provided country does not exist.`)

        try { await existingCountry.remove() }
        catch (error) { throw CustomException.internalServerError(CountryRepository.name, `Deleting a country failed. Reason: ${error.message}.`) }

        throw CustomException.ok(CountryRepository.name, `Country ${existingCountry.country} successfully deleted.`)
    }
}