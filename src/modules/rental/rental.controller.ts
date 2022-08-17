// Rental Controller
import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { Users } from 'src/entities/users.entity'
import { RentalsOutput } from 'src/interfaces/rental-output.interface'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { RentalDto } from './dto/rental.dto'
import { RentalService } from './rental.service'

@Controller('rental')
export class RentalController {
    constructor(private readonly rentalService: RentalService) { }

    // Get Rentals
    @ApiResponse({ status: 200, description: 'Retrieve rentals' })
    @Get()
    async getRentals(@Query() rentalFilters: string): Promise<RentalsOutput[]> {
        return this.rentalService.getRentals(rentalFilters)
    }

    // Create Rental
    @ApiResponse({ status: 201, description: 'Create new rental' })
    @ApiBody({ type: RentalDto })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createRental(@GetUser() user: Users, @Body() RentalDto: RentalDto): Promise<void> {
        return this.rentalService.createRental(user, RentalDto)
    }

    // Edit Rental
    @ApiResponse({ status: 200, description: 'Edit existing rental' })
    @ApiQuery({ name: 'id', description: 'rental id', required: true })
    @ApiBody({ type: RentalDto })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Patch()
    async editRental(@GetUser() user: Users, @Query('id') rentalId: string, @Body() editRentalDto: RentalDto): Promise<void> {
        return this.rentalService.editRental(user, rentalId, editRentalDto)
    }

    // Delete Rental
    @ApiResponse({ status: 200, description: 'Delete existing rental' })
    @ApiQuery({ name: 'id', description: 'rental id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete()
    async deleteRental(@GetUser() user: Users, @Query('id') rentalId: string): Promise<void> {
        return this.rentalService.deleteRental(user, rentalId)
    }
}
