// Place Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PlacesOutput } from 'src/interfaces/place-output.interface'
import { PlaceDto } from './dto/place.dto'
import { PlaceService } from './place.service'

@ApiTags('PLACE')
@Controller('place')
export class PlaceController {
    constructor(private readonly placeService: PlaceService) {}

    // Get places
    @ApiResponse({ status: 200, description: 'Retrieve places' })
    @Get()
    async getPlaces(@Query() placeFilters: string): Promise<PlacesOutput[]> {
        return await this.placeService.getPlaces(placeFilters)
    }

    // Create place
    @ApiResponse({ status: 201, description: 'Create new place' })
    @ApiBody({ type: PlaceDto })
    @Post()
    async createPlace(@Body() placeDto: PlaceDto): Promise<void> {
        await this.placeService.createPlace(placeDto)
    }

    // Edit place
    @ApiResponse({ status: 200, description: 'Edit existing place' })
    @ApiQuery({ name: 'id', description: 'place id', required: true })
    @ApiBody({ type: PlaceDto })
    @Patch()
    async editPlace(@Query('id') placeId: string, @Body() placeDto: PlaceDto): Promise<void> {
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
