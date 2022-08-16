// Image Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { Images } from 'src/entities/images.entity';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    // Get Images
    @Get()
    async getImages(@Query() imageFilters: string): Promise<Images[]> {
        return await this.imageService.getImages(imageFilters)
    }

    // Create Image
    @Post()
    async createImage(@Body() imageDto: any): Promise<void> {
        await this.imageService.createImage(imageDto)
    }

    // Edit Image
    @Patch()
    async editImage(@Query() imageId: string, @Body() imageDto: any): Promise<void> {
        await this.imageService.editImage(imageId, imageDto)
    }

    // Delete Image
    @Delete()
    async deleteImage(@Query() imageId: string): Promise<void> {
        await this.imageService.deleteImage(imageId)
    }
}