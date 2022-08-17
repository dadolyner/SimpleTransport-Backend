// Image Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { Images } from 'src/entities/images.entity'
import { ImageDto } from './dto/image.dto'
import { ImageService } from './image.service'

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    // Get Images
    @ApiResponse({ status: 200, description: 'Retrieve images' })
    @Get()
    async getImages(@Query() imageFilters: string): Promise<Images[]> {
        return await this.imageService.getImages(imageFilters)
    }

    // Create Image
    @ApiResponse({ status: 201, description: 'Create new image' })
    @ApiBody({ type: ImageDto })
    @Post()
    async createImage(@Body() imageDto: ImageDto): Promise<void> {
        await this.imageService.createImage(imageDto)
    }

    // Edit Image
    @ApiResponse({ status: 200, description: 'Edit existing image' })
    @ApiQuery({ name: 'id', description: 'image id', required: true })
    @ApiBody({ type: ImageDto })
    @Patch()
    async editImage(@Query('id') imageId: string, @Body() imageDto: ImageDto): Promise<void> {
        await this.imageService.editImage(imageId, imageDto)
    }

    // Delete Image
    @ApiResponse({ status: 200, description: 'Delete existing image' })
    @ApiQuery({ name: 'id', description: 'image id', required: true })
    @Delete()
    async deleteImage(@Query('id') imageId: string): Promise<void> {
        await this.imageService.deleteImage(imageId)
    }
}
