// Fuel Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { Fuels } from 'src/entities/fuels.entity';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { FuelService } from './fuel.service';

@Controller('fuel')
export class FuelController {
    constructor(private readonly fuelService: FuelService) {}

    // Get Fuels
    @Get()
    async getFuels(@Query('id') fuelId: string): Promise<Fuels[]> {
        return await this.fuelService.getFuels(fuelId);
    }

    // Create Fuel
    @Post()
    async createFuel(@Body() fuel: CreateFuelDto): Promise<void> {
        await this.fuelService.createFuel(fuel);
    }

    // Edit Fuel
    @Patch()
    async editFuel(@Query('id') fuelId: string, @Body() newFuel: CreateFuelDto): Promise<void> {
        await this.fuelService.editFuel(fuelId, newFuel);
    }

    // Delete Fuel
    @Delete()
    async deleteFuel(@Query('id') fuelId: string): Promise<void> {
        await this.fuelService.deleteFuel(fuelId);
    }
}
