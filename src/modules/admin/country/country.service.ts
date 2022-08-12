// Country Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Countries } from 'src/entities/countries.entity'
import { CustomException } from 'src/helpers/custom.exception'
import { CountryRepository } from './country.repository'
import { CreateCountryDto } from './dto/create-country.dto'

@Injectable()
export class CountryService {
    private readonly logger = new Logger(CountryService.name)
    constructor(@InjectRepository(CountryRepository) private readonly countryRepository: CountryRepository) { }

    // Get Countries
    async getCountries(countryFilters: string): Promise<Countries[]> {
        try {
            const countries = await this.countryRepository.createQueryBuilder()
                .select([
                    'country.id',
                    'country.country',
                    'country.abbreviation',
                ])
                .from(Countries, 'country')
                .where(countryFilters)
                .getMany()

            this.logger.verbose(`Retrieving countries. Found ${countries.length} items.`)
            return countries
        }
        catch (error) { throw CustomException.internalServerError(CountryService.name, `Retrieving countries failed. Reason: ${error.message}.`) }
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
