// Country Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { Countries } from 'src/entities/countries.entity'
import { CountryService } from './country.service'
import { CreateCountryDto } from './dto/create-country.dto'

@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    // Get Countries
    @ApiResponse({ status: 200, description: 'Retrieve all countries.' })
    @Get()
    async getCountries(@Query() countryFilters: string): Promise<Countries[]> {
        return this.countryService.getCountries(countryFilters)
    }

    // Create Country
    @ApiResponse({ status: 201, description: 'Create new country.' })
    @ApiBody({ type: CreateCountryDto })
    @Post()
    async createCountry(@Body() countryDto: CreateCountryDto): Promise<void> {
        return this.countryService.createCountry(countryDto)
    }

    // Edit Country
    @ApiResponse({ status: 200, description: 'Edit existing country.' })
    @ApiQuery({ name: 'id', description: 'country id', required: true })
    @ApiBody({ type: CreateCountryDto })
    @Patch()
    async editCountry(@Query('id') countryId: string, @Body() countryDto: CreateCountryDto): Promise<void> {
        return this.countryService.editCountry(countryId, countryDto)
    }

    // Delete Country
    @ApiResponse({ status: 200, description: 'Delete existing country.' })
    @ApiQuery({ name: 'id', description: 'country id', required: true })
    @Delete()
    async deleteCountry(@Query('id') countryId: string): Promise<void> {
        return this.countryService.deleteCountry(countryId)
    }
}
