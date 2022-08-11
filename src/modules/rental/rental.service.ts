import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Rentals } from 'src/entities/rentals.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { RentalRepository } from './rental.repository';

@Injectable()
export class RentalService {
    private readonly logger = new Logger(RentalService.name)
    constructor(@InjectRepository(RentalRepository) private readonly rentalRepository: RentalRepository) {}

    // Get Rentals
    async getRentals(rentalId: string): Promise<Rentals[]> {
        let rentalQuery = this.rentalRepository.createQueryBuilder()
            .select([
                'rental.id',
                'rental.rent_start',
                'rental.rent_end',
                'user.id',
                'user.first_name',
                'user.last_name',
                'user.email',
                'user.username',
                'place.id',
                'place.place',
                'postal.id',
                'postal.post_office',
                'postal.post_number',
                'userCountry.id',
                'userCountry.country',
                'vehicle.id',
                'vehicle.seats',
                'vehicle.shifter',
                'vehicle.horsepower',
                'vehicle.torque',
                'vehicle.acceleration',
                'vehicle.year',
                'vehicle.price',
                'vehicle.rent_duration',
                'vehicle.licence_plate',
                'vehicle.vin',
                'color.id',
                'color.color',
                'fuel.id',
                'fuel.fuel',
                'model.id',
                'model.model',
                'brand.id',
                'brand.brand',
                'country.id',
                'country.country',
            ])
            .from(Rentals, 'rental')
            .leftJoin('rental.user', 'user')
            .leftJoin('user.place', 'place')
            .leftJoin('place.postal', 'postal')
            .leftJoin('place.country', 'userCountry')
            .leftJoin('rental.vehicle', 'vehicle')
            .leftJoin('vehicle.color', 'color')
            .leftJoin('vehicle.fuel', 'fuel')
            .leftJoin('vehicle.model', 'model')
            .leftJoin('model.brand', 'brand')
            .leftJoin('brand.country', 'country')
        if (rentalId) rentalQuery = rentalQuery.where('rental.id = :id', { id: rentalId })

        const rentals = await rentalQuery.getMany()
        this.logger.verbose(`Retrieving rentals. Found ${rentals.length} items.`)

        return rentals
    }

    // Create Rental
    async createRental(rentalDto: CreateRentalDto): Promise<void> {
        return await this.rentalRepository.createRental(rentalDto)
    }

    // Edit Rental
    async editRental(rentalId: string, rentalDto: CreateRentalDto): Promise<void> {
        return await this.rentalRepository.editRental(rentalId, rentalDto)
    }

    // Delete Rental
    async deleteRental(rentalId: string): Promise<void> {
        return await this.rentalRepository.deleteRental(rentalId)
    }
}
