// Country Service
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Countries } from 'src/entities/countries.entity';
import { CountryRepository } from './country.repository';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(CountryRepository) private readonly countryRepository: CountryRepository,
    ) {}

    // Get Countries
    async getCountries(countryId: string): Promise<Countries[]> {
        if (countryId) return this.countryRepository.find({ where: { id: countryId } });
        return this.countryRepository.find();
    }

    // Create Country
    async createCountry(countryDto: CreateCountryDto): Promise<void> {
        return this.countryRepository.createCountry(countryDto);
    }

    // Edit Country
    async editCountry(countryId: string, countryDto: CreateCountryDto): Promise<void> {
        return this.countryRepository.editCountry(countryId, countryDto);
    }

    // Delete Country
    async deleteCountry(countryId: string): Promise<void> {
        return this.countryRepository.deleteCountry(countryId);
    }
}
