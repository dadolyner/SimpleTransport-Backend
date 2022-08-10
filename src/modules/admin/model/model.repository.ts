// Model Repository
import { Brands } from "src/entities/brands.entity"
import { Models } from "src/entities/models.entity"
import { CustomException } from "src/HttpException/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { CreateModelDto } from "./dto/create-model.dto"

@EntityRepository(Models)
export class ModelRepository extends Repository<Models> {

    // Create Model
    async createModel(modelDto: CreateModelDto): Promise<void> {
        const { model, brandId } = modelDto

        const brandExists = await Brands.findOne({ where: { id: brandId } })
        if (!brandExists) throw CustomException.badRequest(ModelRepository.name, `Brand with id: ${brandId} does not exist`)
        const modelExists = await this.findOne({ where: { model: model } })
        if (modelExists) throw CustomException.conflict(ModelRepository.name, `Model: ${model} already exists`)

        const newModel = new Models()
        newModel.model = model
        newModel.brandId = brandId
        newModel.created_at = new Date()
        newModel.updated_at = new Date()

        try { await newModel.save() }
        catch (error) { throw CustomException.internalServerError(ModelRepository.name, `Adding a model failed!. Reason: ${error.message}`) }

        throw CustomException.created(ModelRepository.name, `Model: ${model} successfully created!`)
    }

    // Edit Model
    async editModel(modelId: string, modelDto: CreateModelDto): Promise<void> {
        const existingModel = await this.findOne({ where: { id: modelId } })
        if (!existingModel) throw CustomException.conflict(ModelRepository.name, `Model with id: ${modelId} does not exist!`)

        const oldModel = existingModel.model
        const { model, brandId } = modelDto
        existingModel.model = model
        existingModel.brandId = brandId
        existingModel.updated_at = new Date()

        const modelExists = await this.findOne({ where: { model: model, brandId: brandId } })
        if (modelExists) throw CustomException.conflict(ModelRepository.name, `Model: ${model} with brandId: ${brandId} already exists`)

        try { await existingModel.save() }
        catch (error) { throw CustomException.internalServerError(ModelRepository.name, `Editing a model failed! Reason: ${error.message}`) }

        throw CustomException.ok(ModelRepository.name, `Model: ${oldModel} successfully changed into ${model}!`)
    }

    // Delete Model
    async deleteModel(modelId: string): Promise<void> {
        const existingModel = await this.findOne({ where: { id: modelId } })
        if (!existingModel) throw CustomException.conflict(ModelRepository.name, `Model with id: ${modelId} does not exist!`)

        const oldModel = existingModel.model
        try { await this.delete(existingModel) }
        catch (error) { throw CustomException.internalServerError(ModelRepository.name, `Deleting a model failed! Reason: ${error.message}`) }

        throw CustomException.ok(ModelRepository.name, `Model: ${oldModel} successfully deleted!`)
    }
}