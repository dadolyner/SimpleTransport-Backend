// Model Controller
import { Body, Query, Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { ModelsOutput } from 'src/interfaces/model-output.interface'
import { ModelDto } from './dto/model.dto'
import { ModelService } from './model.service'

@Controller('model')
export class ModelController {
    constructor(private readonly modelService: ModelService) {}

    // Get Models
    @ApiResponse({ status: 200, description: 'Retrieve models' })
    @Get()
    async getModels(@Query() modelFilters: string): Promise<ModelsOutput[]> {
        return this.modelService.getModels(modelFilters)
    }

    // Create Model
    @ApiResponse({ status: 201, description: 'Create new model' })
    @ApiBody({ type: ModelDto })
    @Post()
    async createModel(@Body() modelDto: ModelDto): Promise<void> {
        return this.modelService.createModel(modelDto)
    }

    // Edit Model
    @ApiResponse({ status: 200, description: 'Edit existing model' })
    @ApiQuery({ name: 'id', description: 'model id', required: true })
    @ApiBody({ type: ModelDto })
    @Patch()
    async editModel(@Query('id') modelId: string, @Body() modelDto: ModelDto): Promise<void> {
        return this.modelService.editModel(modelId, modelDto)
    }

    // Delete Model
    @ApiResponse({ status: 200, description: 'Delete existing model' })
    @ApiQuery({ name: 'id', description: 'model id', required: true })
    @Delete()
    async deleteModel(@Query('id') modelId: string): Promise<void> {
        return this.modelService.deleteModel(modelId)
    }
}
