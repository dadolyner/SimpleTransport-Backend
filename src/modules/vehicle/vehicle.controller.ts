import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { Vehicles } from 'src/entities/vehicles.entities';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

    // Get Vehicles
    @Get()
    async getVehicles(@Query('id') vehicleId: string): Promise<Vehicles[]> {
        return await this.vehicleService.getVehicles(vehicleId)
    }

    // Create Vehicle
    @Post()
    async createVehicle(@Body() vehicleDto: CreateVehicleDto): Promise<void> {
        return await this.vehicleService.createVehicle(vehicleDto)
    }

    // Edit Vehicle
    @Patch()
    async editVehicle(@Query('id') vehicleId:string, @Body() vehicleDto: CreateVehicleDto): Promise<void> {
        return await this.vehicleService.editVehicle(vehicleId,vehicleDto)
    }

    // Delete Vehicle
    @Delete()
    async deleteVehicle(@Query('id') vehicleId:string): Promise<void> {
        return await this.vehicleService.deleteVehicle(vehicleId)
    }
}
