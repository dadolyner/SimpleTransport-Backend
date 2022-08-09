// Country Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { Countries } from 'src/entities/countries.entity';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';

@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    // Get Countries
    @Get()
    async getCountries(@Query('id') countryId: string): Promise<Countries[]> {
        return this.countryService.getCountries(countryId);
    }

    // Create Country
    @Post()
    async createCountry(@Body() countryDto: CreateCountryDto): Promise<void> {
        return this.countryService.createCountry(countryDto);
    }

    // Edit Country
    @Patch()
    async editCountry(@Query('id') countryId: string, @Body() countryDto: CreateCountryDto): Promise<void> {
        return this.countryService.editCountry(countryId, countryDto);
    }

    @Delete()
    async deleteCountry(@Query('id') countryId: string): Promise<void> {
        return this.countryService.deleteCountry(countryId);
    }
}
