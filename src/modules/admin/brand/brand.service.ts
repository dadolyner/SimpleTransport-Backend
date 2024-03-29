// Brand Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brands } from 'src/entities/brands.entity'
import { CustomException } from 'src/helpers/custom.exception'
import { AndQueryFilters } from 'src/helpers/queryFilter'
import { BrandsOutput } from 'src/interfaces/brand-output.interface'
import { BrandRepository } from './brand.repository'
import { BrandDto } from './dto/brand.dto'

@Injectable()
export class BrandService {
    private readonly logger = new Logger(BrandService.name)
    constructor(@InjectRepository(BrandRepository) private readonly brandRepository: BrandRepository) { }

    // Get Brands
    async getBrands(brandFilters: string): Promise<BrandsOutput[]> {
        try {
            const brands = await this.brandRepository.createQueryBuilder()
                .select([
                    'brand.id',
                    'brand.brand',
                    'country.country',
                ])
                .from(Brands, 'brand')
                .leftJoin('brand.country', 'country')
                .where(...AndQueryFilters(brandFilters))
                .orderBy('brand.brand', 'ASC')
                .getMany()

            const output = brands.map(brand => {
                return {
                    id: brand.id,
                    brand: brand.brand,
                    country: brand.country.country,
                }
            })

            this.logger.verbose(`Retrieving brands. Found ${brands.length} items.`)
            return output
        }
        catch (error) { throw CustomException.internalServerError(BrandService.name, `Retrieving brands failed. Reason: ${error.message}.`) }
    }

    // Create Brand
    async createBrand(brandDto: BrandDto): Promise<void> {
        return this.brandRepository.createBrand(brandDto)
    }

    // Edit Brand
    async editBrand(brandId: string, brandDto: BrandDto): Promise<void> {
        return this.brandRepository.editBrand(brandId, brandDto)
    }

    // Delete Brand
    async deleteBrand(brandId: string): Promise<void> {
        return this.brandRepository.deleteBrand(brandId)
    }
}
