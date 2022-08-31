// Model Repository
import { Brands } from "src/entities/brands.entity"
import { Models } from "src/entities/models.entity"
import { CustomException } from "src/helpers/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { ModelDto } from "./dto/model.dto"

@EntityRepository(Models)
export class ModelRepository extends Repository<Models> {

    // Create Model
    async createModel(modelDto: ModelDto): Promise<void> {
        const { model, brandId } = modelDto

        const brandExists = await Brands.findOne({ where: { id: brandId } })
        if (!brandExists) throw CustomException.badRequest(ModelRepository.name, `Provided brand does not exist.`)
        const modelExists = await this.findOne({ where: { model: model } })
        if (modelExists) throw CustomException.conflict(ModelRepository.name, `Model ${model} already exists.`)

        const newModel = new Models()
        newModel.model = model
        newModel.brandId = brandId
        newModel.created_at = new Date()
        newModel.updated_at = new Date()

        try { await newModel.save() }
        catch (error) { throw CustomException.internalServerError(ModelRepository.name, `Adding a model failed. Reason: ${error.message}.`) }

        throw CustomException.created(ModelRepository.name, `Model ${model} successfully created.`)
    }

    // Edit Model
    async editModel(modelId: string, modelDto: ModelDto): Promise<void> {
        const { model, brandId } = modelDto
        
        const existingBrand = await Brands.findOne({ where: { id: brandId } })
        if (!existingBrand) throw CustomException.badRequest(ModelRepository.name, `Provided brand does not exist.`)
        const existingModel = await this.findOne({ where: { id: modelId } })
        if (!existingModel) throw CustomException.badRequest(ModelRepository.name, `Provided model does not exist.`)
        const modelExists = await this.findOne({ where: { model: model, brandId: brandId } })
        if (modelExists && modelId !== modelExists.id) throw CustomException.conflict(ModelRepository.name, `Model ${model} for brand ${existingBrand.brand} already exists.`)

        const oldModel = existingModel.model
        existingModel.model = model
        existingModel.brandId = brandId
        existingModel.updated_at = new Date()

        try { await existingModel.save() }
        catch (error) { throw CustomException.internalServerError(ModelRepository.name, `Editing a model failed. Reason: ${error.message}.`) }

        throw CustomException.ok(ModelRepository.name, `Model ${oldModel} successfully edited.`)
    }

    // Delete Model
    async deleteModel(modelId: string): Promise<void> {
        const existingModel = await this.findOne({ where: { id: modelId } })
        if (!existingModel) throw CustomException.badRequest(ModelRepository.name, `Provided model does not exist.`)

        const oldModel = existingModel.model
        try { await this.delete(existingModel) }
        catch (error) { throw CustomException.internalServerError(ModelRepository.name, `Deleting a model failed. Reason: ${error.message}.`) }

        throw CustomException.ok(ModelRepository.name, `Model ${oldModel} successfully deleted.`)
    }
}