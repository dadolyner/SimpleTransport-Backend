// Postal Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { Postals } from 'src/entities/postals.entity';
import { CreatePostalDto } from './dto/create-postal.dto';
import { PostalService } from './postal.service';

@Controller('postal')
export class PostalController {
    constructor(private readonly postalService: PostalService) {}

    // Get Postals
    @Get()
    async getPostals(@Query('id') postalId: string): Promise<Postals[]> {
        return this.postalService.getPostals(postalId);
    }

    // Create Postal
    @Post()
    async createPostal(@Body() postal: CreatePostalDto): Promise<void> {
        return this.postalService.createPostal(postal);
    }

    // Edit Postal
    @Patch()
    async editPostal(@Query('id') postalId: string, @Body() newPostal: CreatePostalDto): Promise<void> {
        return this.postalService.editPostal(postalId, newPostal);
    }

    // Delete Postal
    @Delete()
    async deletePostal(@Query('id') postalId: string): Promise<void> {
        return this.postalService.deletePostal(postalId);
    }
}
