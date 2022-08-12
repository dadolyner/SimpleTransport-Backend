// Model Controller
import { Body, Query, Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { ModelsOutput } from 'src/interfaces/model-output.interface'
import { CreateModelDto } from './dto/create-model.dto'
import { ModelService } from './model.service'

@Controller('model')
export class ModelController {
    constructor(private readonly modelService: ModelService) {}

    // Get Models
    @Get()
    async getModels(@Query() modelFilters: string): Promise<ModelsOutput[]> {
        return this.modelService.getModels(modelFilters)
    }

    // Create Model
    @Post()
    async createModel(@Body() modelDto: CreateModelDto): Promise<void> {
        return this.modelService.createModel(modelDto)
    }

    // Edit Model
    @Patch()
    async editModel(@Query('id') modelId: string, @Body() modelDto: CreateModelDto): Promise<void> {
        return this.modelService.editModel(modelId, modelDto)
    }

    // Delete Model
    @Delete()
    async deleteModel(@Query('id') modelId: string): Promise<void> {
        return this.modelService.deleteModel(modelId)
    }
}
