// Postal Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { Postals } from 'src/entities/postals.entity'
import { CreatePostalDto } from './dto/create-postal.dto'
import { PostalService } from './postal.service'

@Controller('postal')
export class PostalController {
    constructor(private readonly postalService: PostalService) {}

    // Get Postals
    @ApiResponse({ status: 200, description: 'Retrieve all postals' })
    @Get()
    async getPostals(@Query() postalFilters: string): Promise<Postals[]> {
        return this.postalService.getPostals(postalFilters)
    }

    // Create Postal
    @ApiResponse({ status: 201, description: 'Create a new postal' })
    @ApiBody({ type: CreatePostalDto })
    @Post()
    async createPostal(@Body() postalDto: CreatePostalDto): Promise<void> {
        return this.postalService.createPostal(postalDto)
    }

    // Edit Postal
    @ApiResponse({ status: 200, description: 'Edit existing postal' })
    @ApiQuery({ name: 'id', description: 'place id', required: true })
    @ApiBody({ type: CreatePostalDto })
    @Patch()
    async editPostal(@Query('id') postalId: string, @Body() postalDto: CreatePostalDto): Promise<void> {
        return this.postalService.editPostal(postalId, postalDto)
    }

    // Delete Postal
    @ApiResponse({ status: 200, description: 'Delete existing postal' })
    @ApiQuery({ name: 'id', description: 'place id', required: true })
    @Delete()
    async deletePostal(@Query('id') postalId: string): Promise<void> {
        return this.postalService.deletePostal(postalId)
    }
}
