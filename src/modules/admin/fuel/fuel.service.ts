// Fuel Service
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fuels } from 'src/entities/fuels.entity';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { FuelRepository } from './fuel.repository';

@Injectable()
export class FuelService {
    constructor(
        @InjectRepository(FuelRepository) private readonly fuelRepository: FuelRepository,
    ) { }

    // Get Fuels
    async getFuels(fuelId: string): Promise<Fuels[]> {
        if (fuelId) return this.fuelRepository.find({ where: { id: fuelId } });
        return this.fuelRepository.find();
    }

    // Create Fuel
    async createFuel(fuelDto: CreateFuelDto): Promise<void> {
        await this.fuelRepository.createFuel(fuelDto);
    }

    // Edit Fuel
    async editFuel(fuelId: string, fuelDto: CreateFuelDto): Promise<void> {
        await this.fuelRepository.editFuel(fuelId, fuelDto);
    }

    // Delete Fuel
    async deleteFuel(fuelId: string): Promise<void> {
        await this.fuelRepository.deleteFuel(fuelId);
    }
}
