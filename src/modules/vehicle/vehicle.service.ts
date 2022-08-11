import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Vehicles } from 'src/entities/vehicles.entities'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { VehicleRepository } from './vehicle.repository'

@Injectable()
export class VehicleService {
    private readonly logger = new Logger(VehicleService.name)
    constructor(@InjectRepository(VehicleRepository) private readonly vehicleRepository: VehicleRepository) { }

    // Get Vehicles
    async getVehicles(vehicleFilters: string): Promise<Vehicles[]> {
        let vehicleQuery = this.vehicleRepository.createQueryBuilder()
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

        const vehicles = await vehicleQuery.getMany()
        this.logger.verbose(`Retrieving vehicles. Found ${vehicles.length} items.`)

        return vehicles
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
