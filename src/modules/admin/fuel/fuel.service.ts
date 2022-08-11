// Fuel Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Fuels } from 'src/entities/fuels.entity'
import { CreateFuelDto } from './dto/create-fuel.dto'
import { FuelRepository } from './fuel.repository'

@Injectable()
export class FuelService {
    private readonly logger = new Logger(FuelService.name)
    constructor(@InjectRepository(FuelRepository) private readonly fuelRepository: FuelRepository) { }

    // Get Fuels
    async getFuels(fuelFilters: string): Promise<Fuels[]> {
        const fuelQuery = this.fuelRepository.createQueryBuilder()
            .select([
                'fuel.id',
                'fuel.fuel',
            ])
            .from(Fuels, 'fuel')
        .where(fuelFilters)

        const fuels = await fuelQuery.getMany()
        this.logger.verbose(`Retrieving fuels. Found ${fuels.length} items.`)

        return fuels
    }

    // Create Fuel
    async createFuel(fuelDto: CreateFuelDto): Promise<void> {
        await this.fuelRepository.createFuel(fuelDto)
    }

    // Edit Fuel
    async editFuel(fuelId: string, fuelDto: CreateFuelDto): Promise<void> {
        await this.fuelRepository.editFuel(fuelId, fuelDto)
    }

    // Delete Fuel
    async deleteFuel(fuelId: string): Promise<void> {
        await this.fuelRepository.deleteFuel(fuelId)
    }
}
