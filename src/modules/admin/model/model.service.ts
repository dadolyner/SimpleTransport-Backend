// Model Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Models } from 'src/entities/models.entity'
import { CustomException } from 'src/helpers/custom.exception'
import { QueryFilters } from 'src/helpers/queryFilter'
import { ModelsOutput } from 'src/interfaces/model-output.interface'
import { ModelDto } from './dto/model.dto'
import { ModelRepository } from './model.repository'

@Injectable()
export class ModelService {
    private readonly logger = new Logger(ModelService.name)
    constructor(@InjectRepository(ModelRepository) private readonly modelRepository: ModelRepository) { }

    // Get Models
    async getModels(modelFilters: string): Promise<ModelsOutput[]> {
        try {
            const models = await this.modelRepository.createQueryBuilder()
                .select([
                    'model.id',
                    'model.model',
                    'brand.brand',
                    'country.country',
                ])
                .from(Models, 'model')
                .leftJoin('model.brand', 'brand')
                .leftJoin('brand.country', 'country')
                .where(...QueryFilters(modelFilters))
                .getMany()

            const output = models.map(model => {
                return {
                    id: model.id,
                    model: model.model,
                    brand: model.brand.brand,
                    country: model.brand.country.country,
                }
            })

            this.logger.verbose(`Retrieving models. Found ${models.length} items.`)
            return output
        }
        catch (error) { throw CustomException.internalServerError(ModelService.name, `Retrieving models failed. Reason: ${error.message}.`) }
    }

    // Create Model
    async createModel(modelDto: ModelDto): Promise<void> {
        return this.modelRepository.createModel(modelDto)
    }

    // Edit Model
    async editModel(modelId: string, modelDto: ModelDto): Promise<void> {
        return this.modelRepository.editModel(modelId, modelDto)
    }

    // Delete Model
    async deleteModel(modelId: string): Promise<void> {
        return this.modelRepository.deleteModel(modelId)
    }
}
