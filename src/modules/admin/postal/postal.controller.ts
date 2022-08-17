// Postal Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Postals } from 'src/entities/postals.entity'
import { PostalDto } from './dto/postal.dto'
import { PostalService } from './postal.service'

@ApiTags('POSTAL')
@Controller('postal')
export class PostalController {
    constructor(private readonly postalService: PostalService) {}

    // Get Postals
    @ApiResponse({ status: 200, description: 'Retrieve postals' })
    @Get()
    async getPostals(@Query() postalFilters: string): Promise<Postals[]> {
        return this.postalService.getPostals(postalFilters)
    }

    // Create Postal
    @ApiResponse({ status: 201, description: 'Create new postal' })
    @ApiBody({ type: PostalDto })
    @Post()
    async createPostal(@Body() postalDto: PostalDto): Promise<void> {
        return this.postalService.createPostal(postalDto)
    }

    // Edit Postal
    @ApiResponse({ status: 200, description: 'Edit existing postal' })
    @ApiQuery({ name: 'id', description: 'place id', required: true })
    @ApiBody({ type: PostalDto })
    @Patch()
    async editPostal(@Query('id') postalId: string, @Body() postalDto: PostalDto): Promise<void> {
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
