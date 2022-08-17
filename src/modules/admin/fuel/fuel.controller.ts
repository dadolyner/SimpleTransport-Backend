// Fuel Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Fuels } from 'src/entities/fuels.entity'
import { FuelDto } from './dto/fuel.dto'
import { FuelService } from './fuel.service'

@ApiTags('FUEL')
@Controller('fuel')
export class FuelController {
    constructor(private readonly fuelService: FuelService) { }

    // Get Fuels
    @ApiResponse({ status: 200, description: 'Retrieve fuels' })
    @Get()
    async getFuels(@Query() fuelFilters: string): Promise<Fuels[]> {
        return await this.fuelService.getFuels(fuelFilters)
    }

    // Create Fuel
    @ApiResponse({ status: 201, description: 'Create new fuel' })
    @ApiBody({ type: FuelDto })
    @Post()
    async createFuel(@Body() fuelDto: FuelDto): Promise<void> {
        await this.fuelService.createFuel(fuelDto)
    }

    // Edit Fuel
    @ApiResponse({ status: 200, description: 'Edit existing fuel' })
    @ApiQuery({ name: 'id', description: 'fuel id', required: true })
    @ApiBody({ type: FuelDto })
    @Patch()
    async editFuel(@Query('id') fuelId: string, @Body() fuelDto: FuelDto): Promise<void> {
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
