// Fuel Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { Fuels } from 'src/entities/fuels.entity'
import { CreateFuelDto } from './dto/create-fuel.dto'
import { FuelService } from './fuel.service'
@Controller('fuel')
export class FuelController {
    constructor(private readonly fuelService: FuelService) { }

    // Get Fuels
    @ApiResponse({ status: 200, description: 'Retrieve all fuels' })
    @Get()
    async getFuels(@Query() fuelFilters: string): Promise<Fuels[]> {
        return await this.fuelService.getFuels(fuelFilters)
    }

    // Create Fuel
    @ApiResponse({ status: 201, description: 'Create a new fuel' })
    @ApiBody({ type: CreateFuelDto })
    @Post()
    async createFuel(@Body() fuelDto: CreateFuelDto): Promise<void> {
        await this.fuelService.createFuel(fuelDto)
    }

    // Edit Fuel
    @ApiResponse({ status: 200, description: 'Edit existing fuel' })
    @ApiQuery({ name: 'id', description: 'fuel id', required: true })
    @ApiBody({ type: CreateFuelDto })
    @Patch()
    async editFuel(@Query('id') fuelId: string, @Body() fuelDto: CreateFuelDto): Promise<void> {
        await this.fuelService.editFuel(fuelId, fuelDto)
    }

    // Delete Fuel
    @ApiResponse({ status: 200, description: 'Delete existing fuel' })
    @ApiQuery({ name: 'id', description: 'fuel id', required: true })
    @Delete()
    async deleteFuel(@Query('id') fuelId: string): Promise<void> {
        await this.fuelService.deleteFuel(fuelId)
    }
}
