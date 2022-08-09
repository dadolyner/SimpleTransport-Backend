import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import { Fuels } from "src/entities/fuels.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateFuelDto } from "./dto/create-fuel.dto";

@EntityRepository(Fuels)
export class FuelRepository extends Repository<Fuels> {
    private readonly logger = new Logger(FuelRepository.name);

    // Create Fuel
    async createFuel(fuel: CreateFuelDto): Promise<void> {
        const newFuel = new Fuels()
        newFuel.fuel = fuel.fuel
        newFuel.created_at = new Date()
        newFuel.updated_at = new Date()
        try { await newFuel.save() }
        catch (error) {
            if (error.code == 23505) {
                this.logger.error(`Fuel: ${fuel.fuel} already exists`);
                throw new ConflictException('This fuel already exists!');
            } else {
                this.logger.error(`Adding a fuel failed!. Reason: ${error.message}`);
                throw new InternalServerErrorException();
            }
        }

        this.logger.verbose(`Fuel: ${fuel.fuel} successfully added!`);
    }

    // Edit Fuel
    async editFuel(fuelId: string, newFuel: CreateFuelDto): Promise<void> {
        const existingFuel = await this.findOne({ where: { id: fuelId } });
        if (!existingFuel) {
            this.logger.error(`Fuel with id: ${fuelId} does not exist`);
            throw new ConflictException('This fuel does not exist!');
        }

        existingFuel.fuel = newFuel.fuel
        existingFuel.updated_at = new Date()
        try { await existingFuel.save() }
        catch (error) {
            if (error.code == 23505) {
                this.logger.error(`Fuel: ${newFuel.fuel} already exists`);
                throw new ConflictException('This fuel already exists!');
            } else {
                this.logger.error(`Editing a fuel failed!. Reason: ${error.message}`);
                throw new InternalServerErrorException();
            }
        }

        this.logger.verbose(`Fuel: ${newFuel.fuel} successfully edited!`);
    }

    // Delete Fuel
    async deleteFuel(fuelId: string): Promise<void> {
        const existingFuel = await this.findOne({ where: { id: fuelId } });
        if (!existingFuel) {
            this.logger.error(`Fuel with id: ${fuelId} does not exist`);
            throw new ConflictException('This fuel does not exist!');
        }

        try { await existingFuel.remove() }
        catch (error) {
            this.logger.error(`Deleting a fuel failed!. Reason: ${error.message}`);
            throw new InternalServerErrorException();
        }

        this.logger.verbose(`Fuel: ${existingFuel.fuel} successfully deleted!`);
    }
}