// Vehicle Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { Users } from 'src/entities/users.entity'
import { VehiclesOutput } from 'src/interfaces/vehicle-output.interface'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { VehicleService } from './vehicle.service'

@Controller('vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

    // Get Vehicles
    @Get()
    async getVehicles(@Query() vehicleFilters: string): Promise<VehiclesOutput[]> {
        return await this.vehicleService.getVehicles(vehicleFilters)
    }

    // Create Vehicle
    @Post()
    async createVehicle(@GetUser() user: Users, @Body() vehicleDto: CreateVehicleDto): Promise<void> {
        return await this.vehicleService.createVehicle(user, vehicleDto)
    }

    // Edit Vehicle
    @Patch()
    async editVehicle(@GetUser() user: Users, @Query('id') vehicleId:string, @Body() vehicleDto: CreateVehicleDto): Promise<void> {
        return await this.vehicleService.editVehicle(user, vehicleId,vehicleDto)
    }

    // Delete Vehicle
    @Delete()
    async deleteVehicle(@Query('id') vehicleId:string): Promise<void> {
        return await this.vehicleService.deleteVehicle(vehicleId)
    }
}
