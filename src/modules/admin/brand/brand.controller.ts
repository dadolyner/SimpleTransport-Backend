// Brand Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { BrandsOutput } from 'src/interfaces/brand-output.interface'
import { BrandService } from './brand.service'
import { CreateBrandDto } from './dto/create-brand.dto'

@Controller('brand')
export class BrandController {
    constructor(private readonly brandservice: BrandService) { }

    // Get Brands
    @ApiResponse({ status: 200, description: 'Retrieve all brands' })
    @Get()
    async getBrands(@Query() brandFilters: string): Promise<BrandsOutput[]> {
        return this.brandservice.getBrands(brandFilters)
    }

    // Create Brand
    @ApiResponse({ status: 201, description: 'Create a new brand' })
    @ApiBody({ type: CreateBrandDto })
    @Post()
    async createBrand(@Body() brandDto: CreateBrandDto): Promise<void> {
        return this.brandservice.createBrand(brandDto)
    }

    // Edit Brand
    @ApiResponse({ status: 200, description: 'Edit existing brand' })
    @ApiQuery({ name: 'id', description: 'brand id', required: true })
    @ApiBody({ type: CreateBrandDto })
    @Patch()
    async editBrand(@Query('id') brandId: string, @Body() brandDto: CreateBrandDto): Promise<void> {
        return this.brandservice.editBrand(brandId, brandDto)
    }

    // Delete Brand
    @ApiResponse({ status: 200, description: 'Delete existing brand' })
    @ApiQuery({ name: 'id', description: 'brand id', required: true })
    @Delete()
    async deleteBrand(@Query('id') brandId: string): Promise<void> {
        return this.brandservice.deleteBrand(brandId)
    }
}
