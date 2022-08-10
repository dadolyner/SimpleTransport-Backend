// Place Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { Places } from 'src/entities/places.entity'
import { PlaceService } from './place.service'

@Controller('place')
export class PlaceController {
    constructor(private readonly placeService: PlaceService) {}

    // Get places
    @Get()
    async getPlaces(@Query('id') placeId: string): Promise<Places[]> {
        return await this.placeService.getPlaces(placeId)
    }

    // Create place
    @Post()
    async createPlace(@Body() placeDto: Places): Promise<void> {
        await this.placeService.createPlace(placeDto)
    }

    // Edit place
    @Patch()
    async editPlace(@Query('id') placeId: string, @Body() placeDto: Places): Promise<void> {
        await this.placeService.editPlace(placeId, placeDto)
    }

    // Delete place
    @Delete()
    async deletePlace(@Query('id') placeId: string): Promise<void> {
        await this.placeService.deletePlace(placeId)
    }
}
