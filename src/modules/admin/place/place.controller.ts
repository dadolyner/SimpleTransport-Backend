// Place Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { PlacesOutput } from 'src/interfaces/place-output.interface'
import { CreatePlaceDto } from './dto/create-place.dto'
import { PlaceService } from './place.service'

@Controller('place')
export class PlaceController {
    constructor(private readonly placeService: PlaceService) {}

    // Get places
    @ApiResponse({ status: 200, description: 'Retrieve all places' })
    @Get()
    async getPlaces(@Query() placeFilters: string): Promise<PlacesOutput[]> {
        return await this.placeService.getPlaces(placeFilters)
    }

    // Create place
    @ApiResponse({ status: 201, description: 'Create new place' })
    @ApiBody({ type: CreatePlaceDto })
    @Post()
    async createPlace(@Body() placeDto: CreatePlaceDto): Promise<void> {
        await this.placeService.createPlace(placeDto)
    }

    // Edit place
    @ApiResponse({ status: 200, description: 'Edit existing place' })
    @ApiQuery({ name: 'id', description: 'place id', required: true })
    @ApiBody({ type: CreatePlaceDto })
    @Patch()
    async editPlace(@Query('id') placeId: string, @Body() placeDto: CreatePlaceDto): Promise<void> {
        await this.placeService.editPlace(placeId, placeDto)
    }

    // Delete place
    @ApiResponse({ status: 200, description: 'Delete existing place' })
    @ApiQuery({ name: 'id', description: 'place id', required: true })
    @Delete()
    async deletePlace(@Query('id') placeId: string): Promise<void> {
        await this.placeService.deletePlace(placeId)
    }
}
