// Fuel Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { Fuels } from 'src/entities/fuels.entity'
import { CreateFuelDto } from './dto/create-fuel.dto'
import { FuelService } from './fuel.service'
@Controller('fuel')
export class FuelController {
    constructor(private readonly fuelService: FuelService) {}

    // Get Fuels
    @Get()
    async getFuels(@Query() fuelFilters: string): Promise<Fuels[]> {
        return await this.fuelService.getFuels(fuelFilters)
    }

    // Create Fuel
    @Post()
    async createFuel(@Body() fuelDto: CreateFuelDto): Promise<void> {
        await this.fuelService.createFuel(fuelDto)
    }

    // Edit Fuel
    @Patch()
    async editFuel(@Query('id') fuelId: string, @Body() fuelDto: CreateFuelDto): Promise<void> {
        await this.fuelService.editFuel(fuelId, fuelDto)
    }

    // Delete Fuel
    @Delete()
    async deleteFuel(@Query('id') fuelId: string): Promise<void> {
        await this.fuelService.deleteFuel(fuelId)
    }
}
