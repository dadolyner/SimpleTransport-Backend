// Place Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { PlacesOutput } from 'src/interfaces/place-output.interface'
import { CreatePlaceDto } from './dto/create-place.dto'
import { PlaceService } from './place.service'

@Controller('place')
export class PlaceController {
    constructor(private readonly placeService: PlaceService) {}

    // Get places
    @Get()
    async getPlaces(@Query() placeFilters: string): Promise<PlacesOutput[]> {
        return await this.placeService.getPlaces(placeFilters)
    }

    // Create place
    @Post()
    async createPlace(@Body() placeDto: CreatePlaceDto): Promise<void> {
        await this.placeService.createPlace(placeDto)
    }

    // Edit place
    @Patch()
    async editPlace(@Query('id') placeId: string, @Body() placeDto: CreatePlaceDto): Promise<void> {
        await this.placeService.editPlace(placeId, placeDto)
    }

    // Delete place
    @Delete()
    async deletePlace(@Query('id') placeId: string): Promise<void> {
        await this.placeService.deletePlace(placeId)
    }
}
