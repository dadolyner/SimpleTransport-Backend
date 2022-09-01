// Fuel Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Fuels } from 'src/entities/fuels.entity'
import { CustomException } from 'src/helpers/custom.exception'
import { AndQueryFilters } from 'src/helpers/queryFilter'
import { FuelDto } from './dto/fuel.dto'
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
                .where(...AndQueryFilters(fuelFilters))
                .orderBy('fuel.fuel', 'ASC')
                .getMany()

            this.logger.verbose(`Retrieving fuels. Found ${fuels.length} items.`)
            return fuels
        }
        catch (error) { throw CustomException.internalServerError(FuelService.name, `Retrieving fuels failed. Reason: ${error.message}.`) }
    }

    // Create Fuel
    async createFuel(fuelDto: FuelDto): Promise<void> {
        await this.fuelRepository.createFuel(fuelDto)
    }

    // Edit Fuel
    async editFuel(fuelId: string, fuelDto: FuelDto): Promise<void> {
        await this.fuelRepository.editFuel(fuelId, fuelDto)
    }

    // Delete Fuel
    async deleteFuel(fuelId: string): Promise<void> {
        await this.fuelRepository.deleteFuel(fuelId)
    }
}
