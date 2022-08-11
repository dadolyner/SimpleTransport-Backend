import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { Rentals } from 'src/entities/rentals.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { RentalService } from './rental.service';

@Controller('rental')
export class RentalController {
    constructor(private readonly rentalService: RentalService) {}

    // Get Rentals
    @Get()
    async getRentals(@Query('id') rentalId: string): Promise<Rentals[]> {
        return this.rentalService.getRentals(rentalId);
    }

    // Create Rental
    @Post()
    async createRental(@Body() createRentalDto: CreateRentalDto): Promise<void> {
        return this.rentalService.createRental(createRentalDto);
    }

    // Edit Rental
    @Patch()
    async editRental(@Query('id') rentalId: string, @Body() editRentalDto: CreateRentalDto): Promise<void> {
        return this.rentalService.editRental(rentalId, editRentalDto);
    }

    // Delete Rental
    @Delete()
    async deleteRental(@Query('id') rentalId: string): Promise<void> {
        return this.rentalService.deleteRental(rentalId);
    }
}
