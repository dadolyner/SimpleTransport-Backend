// Brand Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brands } from 'src/entities/brands.entity'
import { BrandRepository } from './brand.repository'
import { CreateBrandDto } from './dto/create-brand.dto'

@Injectable()
export class BrandService {
    private readonly logger = new Logger(BrandService.name)
    constructor(@InjectRepository(BrandRepository) private readonly brandRepository: BrandRepository) {}

    // Get Brands
    async getBrands(brandId: string): Promise<Brands[]> {
        let brandsQuery = this.brandRepository.createQueryBuilder()
            .select([
                'brand.id',
                'brand.brand',
                'country.country',
            ])
            .from(Brands, 'brand')
            .innerJoin('brand.country', 'country')
        if(brandId) brandsQuery = brandsQuery.where('brand.id = :id', { id: brandId })

        const brands = await brandsQuery.getMany()
        this.logger.verbose(`Retrieving brands. Found ${brands.length} items.`)

        return brands
    }

    // Create Brand
    async createBrand(brandDto: CreateBrandDto): Promise<void> {
        return this.brandRepository.createBrand(brandDto)
    }

    // Edit Brand
    async editBrand(brandId: string, brandDto: CreateBrandDto): Promise<void> {
        return this.brandRepository.editBrand(brandId, brandDto)
    }

    // Delete Brand
    async deleteBrand(brandId: string): Promise<void> {
        return this.brandRepository.deleteBrand(brandId)
    }
}
