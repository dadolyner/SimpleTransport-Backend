// Vehicle Controller
import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Users } from 'src/entities/users.entity'
import { VehiclesOutput } from 'src/interfaces/vehicle-output.interface'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { VehicleDto } from './dto/vehicle.dto'
import { VehicleService } from './vehicle.service'

@ApiTags('VEHICLE')
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
    @ApiBody({ type: VehicleDto })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createVehicle(@GetUser() user: Users, @Body() vehicleDto: VehicleDto): Promise<void> {
        return await this.vehicleService.createVehicle(user, vehicleDto)
    }

    // Edit Vehicle
    @ApiResponse({ status: 200, description: 'Edit existing vehicle.' })
    @ApiQuery({ name: 'id', description: 'vehicle id', required: true })
    @ApiBody({ type: VehicleDto })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Patch()
    async editVehicle(@GetUser() user: Users, @Query('id') vehicleId: string, @Body() vehicleDto: VehicleDto): Promise<void> {
        return await this.vehicleService.editVehicle(user, vehicleId, vehicleDto)
    }

    // Delete Vehicle
    @ApiResponse({ status: 200, description: 'Delete existing vehicle.' })
    @ApiQuery({ name: 'id', description: 'vehicle id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete()
    async deleteVehicle(@GetUser() user: Users, @Query('id') vehicleId: string): Promise<void> {
        return await this.vehicleService.deleteVehicle(user, vehicleId)
    }
}
