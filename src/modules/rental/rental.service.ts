import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Rentals } from 'src/entities/rentals.entity'
import { CustomException } from 'src/helpers/custom.exception'
import { RentalsOutput } from 'src/interfaces/rental-output.interface'
import { CreateRentalDto } from './dto/create-rental.dto'
import { RentalRepository } from './rental.repository'

@Injectable()
export class RentalService {
    private readonly logger = new Logger(RentalService.name)
    constructor(@InjectRepository(RentalRepository) private readonly rentalRepository: RentalRepository) { }

    // Get Rentals
    async getRentals(rentalFilters: string): Promise<RentalsOutput[]> {
        try {
            const rentals = await this.rentalRepository.createQueryBuilder()
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
                .where(rentalFilters)
                .getMany()

            const output = rentals.map(rental => {
                return {
                    id: rental.id,
                    rent_start: rental.rent_start,
                    rent_end: rental.rent_end,
                    user: {
                        id: rental.user.id,
                        first_name: rental.user.first_name,
                        last_name: rental.user.last_name,
                        email: rental.user.email,
                        username: rental.user.username,
                        place: rental.user.place.place,
                        post_office: rental.user.place.postal.post_office,
                        post_number: rental.user.place.postal.post_number,
                        country: rental.user.place.country.country,
                    },
                    vehicle: {
                        id: rental.vehicle.id,
                        seats: rental.vehicle.seats,
                        shifter: rental.vehicle.shifter,
                        horsepower: rental.vehicle.horsepower,
                        torque: rental.vehicle.torque,
                        acceleration: rental.vehicle.acceleration,
                        year: rental.vehicle.year,
                        price: rental.vehicle.price,
                        rent_duration: rental.vehicle.rent_duration,
                        licence_plate: rental.vehicle.licence_plate,
                        vin: rental.vehicle.vin,
                        color: rental.vehicle.color.color,
                        fuel: rental.vehicle.fuel.fuel,
                        model: rental.vehicle.model.model,
                        brand: rental.vehicle.model.brand.brand,
                        country: rental.vehicle.model.brand.country.country,
                    }
                }
            })

            this.logger.verbose(`Retrieving rentals. Found ${rentals.length} items.`)
            return output
        }
        catch (error) { throw CustomException.internalServerError(RentalService.name, `Retrieving rentals failed. Reason: ${error}.`) }
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
