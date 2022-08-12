// Fuel Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Fuels } from 'src/entities/fuels.entity'
import { CustomException } from 'src/helpers/custom.exception'
import { CreateFuelDto } from './dto/create-fuel.dto'
import { FuelRepository } from './fuel.repository'

@Injectable()
export class FuelService {
    private readonly logger = new Logger(FuelService.name)
    constructor(@InjectRepository(FuelRepository) private readonly fuelRepository: FuelRepository) { }

    // Get Fuels
    async getFuels(fuelFilters: string): Promise<Fuels[]> {
        try {
            const fuels = await this.fuelRepository.createQueryBuilder()
                .select([
                    'fuel.id',
                    'fuel.fuel',
                ])
                .from(Fuels, 'fuel')
                .where(fuelFilters)
                .getMany()

            this.logger.verbose(`Retrieving fuels. Found ${fuels.length} items.`)
            return fuels
        }
        catch (error) { throw CustomException.internalServerError(FuelService.name, `Retrieving fuels failed. Reason: ${error.message}.`) }
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
