// Vehicle Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Vehicles } from 'src/entities/vehicles.entities'
import { CustomException } from 'src/helpers/custom.exception'
import { VehiclesOutput } from 'src/interfaces/vehicle-output.interface'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { VehicleRepository } from './vehicle.repository'

@Injectable()
export class VehicleService {
    private readonly logger = new Logger(VehicleService.name)
    constructor(@InjectRepository(VehicleRepository) private readonly vehicleRepository: VehicleRepository) { }

    // Get Vehicles
    async getVehicles(vehicleFilters: string): Promise<VehiclesOutput[]> {
        try {
            const vehicles = await this.vehicleRepository.createQueryBuilder()
                .select([
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
                .from(Vehicles, 'vehicle')
                .innerJoin('vehicle.user', 'user')
                .innerJoin('user.place', 'place')
                .innerJoin('place.postal', 'postal')
                .innerJoin('place.country', 'userCountry')
                .leftJoin('vehicle.color', 'color')
                .leftJoin('vehicle.fuel', 'fuel')
                .leftJoin('vehicle.model', 'model')
                .leftJoin('model.brand', 'brand')
                .leftJoin('brand.country', 'country')
                .where(vehicleFilters)
                .getMany()

            const output = vehicles.map(vehicle => {
                return {
                    vehicle: {
                        id: vehicle.id,
                        seats: vehicle.seats,
                        shifter: vehicle.shifter,
                        horsepower: vehicle.horsepower,
                        torque: vehicle.torque,
                        acceleration: vehicle.acceleration,
                        year: vehicle.year,
                        price: vehicle.price,
                        rent_duration: vehicle.rent_duration,
                        licence_plate: vehicle.licence_plate,
                        vin: vehicle.vin,
                        color: vehicle.color.color,
                        fuel: vehicle.fuel.fuel,
                        model: vehicle.model.model,
                        brand: vehicle.model.brand.brand,
                        country: vehicle.model.brand.country.country,
                    },
                    user: {
                        id: vehicle.user.id,
                        first_name: vehicle.user.first_name,
                        last_name: vehicle.user.last_name,
                        email: vehicle.user.email,
                        username: vehicle.user.username,
                        place: vehicle.user.place.place,
                        post_office: vehicle.user.place.postal.post_office,
                        post_number: vehicle.user.place.postal.post_number,
                        country: vehicle.user.place.country.country,
                    },
                }
            })

            this.logger.verbose(`Retrieving vehicles. Found ${vehicles.length} items.`)
            return output
        }
        catch (error) { throw CustomException.internalServerError(VehicleService.name, `Retrieving vehicles failed. Reason: ${error}.`) }
    }

    // Create Vehicle
    async createVehicle(vehicleDto: CreateVehicleDto): Promise<void> {
        return await this.vehicleRepository.createVehicle(vehicleDto)
    }

    // Edit Vehicle
    async editVehicle(vehicleId: string, vehicleDto: CreateVehicleDto): Promise<void> {
        return await this.vehicleRepository.editVehicle(vehicleId, vehicleDto)
    }

    // Delete Vehicle
    async deleteVehicle(vehicleId: string): Promise<void> {
        return await this.vehicleRepository.deleteVehicle(vehicleId)
    }
}
