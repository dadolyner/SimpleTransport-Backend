// Rental Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Rentals } from 'src/entities/rentals.entity'
import { Users } from 'src/entities/users.entity'
import { CustomException } from 'src/helpers/custom.exception'
import { AndQueryFilters } from 'src/helpers/queryFilter'
import { RentalsOutput } from 'src/interfaces/rental-output.interface'
import { RentalDto } from './dto/rental.dto'
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
                    'rental.updated_at',
                    'user.id',
                    'user.first_name',
                    'user.last_name',
                    'user.email',
                    'user.username',
                    'place.id',
                    'place.place',
                    'postal.id',
                    'postal.post_office',
                    'postal.post_code',
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
                    'vehicle.imageUrl',
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
                .where(...AndQueryFilters(rentalFilters))
                .orderBy('rental.updated_at', 'DESC')
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
                        post_code: rental.user.place.postal.post_code,
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
                        image: rental.vehicle.imageUrl,
                    }
                }
            })

            this.logger.verbose(`Retrieving rentals. Found ${rentals.length} items.`)
            return output
        }
        catch (error) { throw CustomException.internalServerError(RentalService.name, `Retrieving rentals failed. Reason: ${error}.`) }
    }

    // Create Rental
    async createRental(user: Users, rentalDto: RentalDto): Promise<void> {
        return await this.rentalRepository.createRental(user, rentalDto)
    }

    // Edit Rental
    async editRental(user: Users,rentalId: string, rentalDto: RentalDto): Promise<void> {
        return await this.rentalRepository.editRental(user, rentalId, rentalDto)
    }

    // Delete Rental
    async deleteRental(user: Users, rentalId: string): Promise<void> {
        return await this.rentalRepository.deleteRental(user, rentalId)
    }
}
