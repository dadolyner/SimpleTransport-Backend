// Model Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Models } from 'src/entities/models.entity'
import { CreateModelDto } from './dto/create-model.dto'
import { ModelRepository } from './model.repository'

@Injectable()
export class ModelService {
    private readonly logger = new Logger(ModelService.name)
    constructor(@InjectRepository(ModelRepository) private readonly modelRepository: ModelRepository) {}

    // Get Models
    async getModels(modelId: string): Promise<Models[]> {
        let modelsQuery = this.modelRepository.createQueryBuilder()
            .select([
                'model.id',
                'model.model',
                'brand.brand',
                'country.country',
            ])
            .from(Models, 'model')
            .innerJoin('model.brand', 'brand')
            .innerJoin('brand.country', 'country')
        if(modelId) modelsQuery = modelsQuery.where('model.id = :id', { id: modelId })

        const models = await modelsQuery.getMany()
        this.logger.verbose(`Retrieving models. Found ${models.length} items.`)

        return models
    }

    // Create Model
    async createModel(modelDto: CreateModelDto): Promise<void> {
        return this.modelRepository.createModel(modelDto)
    }

    // Edit Model
    async editModel(modelId: string, modelDto: CreateModelDto): Promise<void> {
        return this.modelRepository.editModel(modelId, modelDto)
    }

    // Delete Model
    async deleteModel(modelId: string): Promise<void> {
        return this.modelRepository.deleteModel(modelId)
    }
}
