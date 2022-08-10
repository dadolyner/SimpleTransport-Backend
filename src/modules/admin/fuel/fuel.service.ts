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
    async getFuels(fuelId: string): Promise<Fuels[]> {
        if (fuelId) {
            const fuels = await this.fuelRepository.find({ where: { id: fuelId } })
            this.logger.verbose(`Retrieving fuel with id: ${fuelId}. Found ${fuels.length} items.`)
            return fuels
        } else {
            const fuels = await this.fuelRepository.find()
            this.logger.verbose(`Retrieving all fuels. Found ${fuels.length} items.`)
            return fuels
        }
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
