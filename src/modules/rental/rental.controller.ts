// Rental Controller
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { Users } from 'src/entities/users.entity'
import { RentalsOutput } from 'src/interfaces/rental-output.interface'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { CreateRentalDto } from './dto/create-rental.dto'
import { RentalService } from './rental.service'

@Controller('rental')
export class RentalController {
    constructor(private readonly rentalService: RentalService) {}

    // Get Rentals
    @Get()
    async getRentals(@Query() rentalFilters: string): Promise<RentalsOutput[]> {
        return this.rentalService.getRentals(rentalFilters)
    }

    // Create Rental
    @Post()
    async createRental(@GetUser() user: Users, @Body() createRentalDto: CreateRentalDto): Promise<void> {
        return this.rentalService.createRental(user, createRentalDto)
    }

    // Edit Rental
    @Patch()
    async editRental(@GetUser() user: Users, @Query('id') rentalId: string, @Body() editRentalDto: CreateRentalDto): Promise<void> {
        return this.rentalService.editRental(user, rentalId, editRentalDto)
    }

    // Delete Rental
    @Delete()
    async deleteRental(@Query('id') rentalId: string): Promise<void> {
        return this.rentalService.deleteRental(rentalId)
    }
}
