// Vehicle Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { Users } from 'src/entities/users.entity'
import { VehiclesOutput } from 'src/interfaces/vehicle-output.interface'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { VehicleService } from './vehicle.service'

@Controller('vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) { }

    // Get Vehicles
    @ApiResponse({ status: 200, description: 'Retrieve all vehicles.' })
    @Get()
    async getVehicles(@Query() vehicleFilters: string): Promise<VehiclesOutput[]> {
        return await this.vehicleService.getVehicles(vehicleFilters)
    }

    // Create Vehicle
    @ApiResponse({ status: 201, description: 'Create new vehicle.' })
    @ApiBody({ type: CreateVehicleDto })
    @ApiBearerAuth()
    @Post()
    async createVehicle(@GetUser() user: Users, @Body() vehicleDto: CreateVehicleDto): Promise<void> {
        return await this.vehicleService.createVehicle(user, vehicleDto)
    }

    // Edit Vehicle
    @ApiResponse({ status: 200, description: 'Edit existing vehicle.' })
    @ApiQuery({ name: 'id', description: 'vehicle id', required: true })
    @ApiBody({ type: CreateVehicleDto })
    @ApiBearerAuth()
    @Patch()
    async editVehicle(@GetUser() user: Users, @Query('id') vehicleId: string, @Body() vehicleDto: CreateVehicleDto): Promise<void> {
        return await this.vehicleService.editVehicle(user, vehicleId, vehicleDto)
    }

    // Delete Vehicle
    @ApiResponse({ status: 200, description: 'Delete existing vehicle.' })
    @ApiQuery({ name: 'id', description: 'vehicle id', required: true })
    @Delete()
    async deleteVehicle(@Query('id') vehicleId: string): Promise<void> {
        return await this.vehicleService.deleteVehicle(vehicleId)
    }
}
