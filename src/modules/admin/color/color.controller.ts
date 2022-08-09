// Color Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { Colors } from 'src/entities/colors.entity';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';

@Controller('color')
export class ColorController {
    constructor(private readonly colorService: ColorService) { }

    // Get All Colors
    @Get()
    async getAllColors(@Query('id') colorId: string): Promise<Colors[]> {
        return this.colorService.getColors(colorId);
    }

    // Create Color
    @Post()
    async createColor(@Body() colorDto: CreateColorDto): Promise<void> {
        return this.colorService.createColor(colorDto);
    }

    // Edit Color
    @Patch()
    async editColor(@Query('id') colorId: string, @Body() colorDto: CreateColorDto): Promise<void> {
        return this.colorService.editColor(colorId, colorDto);
    }

    // Delete Color
    @Delete()
    async deleteColor(@Query('id') colorId: string): Promise<void> {
        return this.colorService.deleteColor(colorId);
    }
}
