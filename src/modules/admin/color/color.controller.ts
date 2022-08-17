// Color Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { Colors } from 'src/entities/colors.entity'
import { ColorService } from './color.service'
import { ColorDto } from './dto/color.dto'

@Controller('color')
export class ColorController {
    constructor(private readonly colorService: ColorService) { }

    // Get All Colors
    @ApiResponse({ status: 200, description: 'Retrieve colors' })
    @Get()
    async getAllColors(@Query() colorFilters: string): Promise<Colors[]> {
        return this.colorService.getColors(colorFilters)
    }

    // Create Color
    @ApiResponse({ status: 201, description: 'Create new color' })
    @ApiBody({ type: ColorDto })
    @Post()
    async createColor(@Body() colorDto: ColorDto): Promise<void> {
        return this.colorService.createColor(colorDto)
    }

    // Edit Color
    @ApiResponse({ status: 200, description: 'Edit existing color' })
    @ApiQuery({ name: 'id', description: 'color id', required: true })
    @ApiBody({ type: ColorDto })
    @Patch()
    async editColor(@Query('id') colorId: string, @Body() colorDto: ColorDto): Promise<void> {
        return this.colorService.editColor(colorId, colorDto)
    }

    // Delete Color
    @ApiResponse({ status: 200, description: 'Delete existing color' })
    @ApiQuery({ name: 'id', description: 'color id', required: true })
    @Delete()
    async deleteColor(@Query('id') colorId: string): Promise<void> {
        return this.colorService.deleteColor(colorId)
    }
}
