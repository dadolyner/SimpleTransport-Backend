// Brand Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { BrandsOutput } from 'src/interfaces/brand-output.interface'
import { BrandService } from './brand.service'
import { CreateBrandDto } from './dto/create-brand.dto'

@Controller('brand')
export class BrandController {
    constructor(private readonly brandservice: BrandService) { }

    // Get Brands
    @Get()
    async getBrands(@Query() brandFilters: string): Promise<BrandsOutput[]> {
        return this.brandservice.getBrands(brandFilters)
    }

    // Create Brand
    @Post()
    async createBrand(@Body() brandDto: CreateBrandDto): Promise<void> {
        return this.brandservice.createBrand(brandDto)
    }

    // Edit Brand
    @Patch()
    async editBrand(@Query('id') brandId: string, @Body() brandDto: CreateBrandDto): Promise<void> {
        return this.brandservice.editBrand(brandId, brandDto)
    }

    // Delete Brand
    @Delete()
    async deleteBrand(@Query('id') brandId: string): Promise<void> {
        return this.brandservice.deleteBrand(brandId)
    }
}
