// Country Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Countries } from 'src/entities/countries.entity'
import { CountryRepository } from './country.repository'
import { CreateCountryDto } from './dto/create-country.dto'

@Injectable()
export class CountryService {
    private readonly logger = new Logger(CountryService.name)
    constructor(@InjectRepository(CountryRepository) private readonly countryRepository: CountryRepository) {}

    // Get Countries
    async getCountries(countryId: string): Promise<Countries[]> {
        if (countryId) {
            const countries = await this.countryRepository.find({ where: { id: countryId } })
            this.logger.verbose(`Retrieving country with id: ${countryId}. Found ${countries.length} items.`)
            return countries
        } else {
            const countries = await this.countryRepository.find()
            this.logger.verbose(`Retrieving all countries. Found ${countries.length} items.`)
            return countries
        }
    }

    // Create Country
    async createCountry(countryDto: CreateCountryDto): Promise<void> {
        return this.countryRepository.createCountry(countryDto)
    }

    // Edit Country
    async editCountry(countryId: string, countryDto: CreateCountryDto): Promise<void> {
        return this.countryRepository.editCountry(countryId, countryDto)
    }

    // Delete Country
    async deleteCountry(countryId: string): Promise<void> {
        return this.countryRepository.deleteCountry(countryId)
    }
}
