// Country Repository
import { Countries } from "src/entities/countries.entity"
import { CustomException } from "src/HttpException/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { CreateCountryDto } from "./dto/create-country.dto"

@EntityRepository(Countries)
export class CountryRepository extends Repository<Countries> {

    // Create Country
    async createCountry(countryDto: CreateCountryDto): Promise<void> {
        const { country, abbreviation } = countryDto

        const newCountry = new Countries()
        newCountry.country = country
        newCountry.abbreviation = abbreviation
        newCountry.created_at = new Date()
        newCountry.updated_at = new Date()

        try { await newCountry.save() }
        catch (error) {
            if (error.code == 23505) throw CustomException.conflict(CountryRepository.name, `Country: ${country} (${abbreviation}) already exists!`)
            else throw CustomException.internalServerError(CountryRepository.name, `Adding a country failed! Reason: ${error.message}`)
        }

        throw CustomException.created(CountryRepository.name, `Country: ${country} successfully created!`)
    }

    // Edit Country
    async editCountry(countryId: string, countryDto: CreateCountryDto): Promise<void> {
        const existingCountry = await this.findOne({ where: { id: countryId } })
        if (!existingCountry) throw CustomException.notFound(CountryRepository.name, `Country with id: ${countryId} does not exist!`)

        const oldCountry = existingCountry.country
        const { country, abbreviation } = countryDto
        existingCountry.country = country
        existingCountry.abbreviation = abbreviation
        existingCountry.updated_at = new Date()

        try { await existingCountry.save() }
        catch (error) {
            if (error.code == 23505) throw CustomException.conflict(CountryRepository.name, `Country: ${country} (${abbreviation}) already exist!`)
            else throw CustomException.internalServerError(CountryRepository.name, `Editing a country failed! Reason: ${error.message}`)
        }

        throw CustomException.ok(CountryRepository.name, `Country: ${oldCountry} successfully changed into ${country}!`)
    }

    // Delete Country
    async deleteCountry(countryId: string): Promise<void> {
        const existingCountry = await this.findOne({ where: { id: countryId } })
        if (!existingCountry) throw CustomException.notFound(CountryRepository.name, `Country with id: ${countryId} does not exist!`)

        try { await existingCountry.remove() }
        catch (error) { throw CustomException.internalServerError(CountryRepository.name, `Deleting a country failed! Reason: ${error.message}`) }

        throw CustomException.ok(CountryRepository.name, `Country: ${existingCountry.country} successfully deleted!`)
    }
}