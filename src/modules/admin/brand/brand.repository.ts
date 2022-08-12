// Brand Repository
import { Brands } from "src/entities/brands.entity"
import { Countries } from "src/entities/countries.entity"
import { CustomException } from "src/helpers/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { CreateBrandDto } from "./dto/create-brand.dto"

@EntityRepository(Brands)
export class BrandRepository extends Repository<Brands> {

    // Create Brand
    async createBrand(brandDto: CreateBrandDto): Promise<void> {
        const { brand, countryId } = brandDto

        const countryExists = await Countries.findOne({ where: { id: countryId } })
        if (!countryExists) throw CustomException.badRequest(BrandRepository.name, `Country with id: ${countryId} does not exist`)
        const brandExists = await this.findOne({ where: { brand: brand } })
        if (brandExists) throw CustomException.conflict(BrandRepository.name, `Brand: ${brand} already exists`)

        const newBrand = new Brands()
        newBrand.brand = brand
        newBrand.countryId = countryId
        newBrand.created_at = new Date()
        newBrand.updated_at = new Date()

        try { await newBrand.save() }
        catch (error) { throw CustomException.internalServerError(BrandRepository.name, `Adding a brand failed!. Reason: ${error.message}`) }

        throw CustomException.created(BrandRepository.name, `Brand: ${brand} successfully created!`)
    }

    // Edit Brand
    async editBrand(brandId: string, brandDto: CreateBrandDto): Promise<void> {
        const existingBrand = await this.findOne({ where: { id: brandId } })
        if (!existingBrand) throw CustomException.conflict(BrandRepository.name, `Brand with id: ${brandId} does not exist!`)

        const oldBrand = existingBrand.brand
        const { brand, countryId } = brandDto
        existingBrand.brand = brand
        existingBrand.countryId = countryId
        existingBrand.updated_at = new Date()

        const brandExists = await this.findOne({ where: { brand: brand, countryId: countryId } })
        if (brandExists) throw CustomException.conflict(BrandRepository.name, `Brand: ${brand} with countryId: ${countryId} already exists`)

        try { await existingBrand.save() }
        catch (error) { throw CustomException.internalServerError(BrandRepository.name, `Editing a brand failed! Reason: ${error.message}`) }

        throw CustomException.ok(BrandRepository.name, `Brand: ${oldBrand} successfully changed into ${brand}!`)
    }

    // Delete Brand
    async deleteBrand(brandId: string): Promise<void> {
        const existingBrand = await this.findOne({ where: { id: brandId } })
        if (!existingBrand) throw CustomException.conflict(BrandRepository.name, `Brand with id: ${brandId} does not exist!`)

        try { await existingBrand.remove() }
        catch (error) { throw CustomException.internalServerError(BrandRepository.name, `Deleting a brand failed! Reason: ${error.message}`) }

        throw CustomException.ok(BrandRepository.name, `Brand: ${existingBrand.brand} successfully deleted!`)
    }
}