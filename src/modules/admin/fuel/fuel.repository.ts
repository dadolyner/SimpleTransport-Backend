// Fuel Repository
import { Fuels } from "src/entities/fuels.entity"
import { CustomException } from "src/HttpException/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { CreateFuelDto } from "./dto/create-fuel.dto"

@EntityRepository(Fuels)
export class FuelRepository extends Repository<Fuels> {

    // Create Fuel
    async createFuel(fuelDto: CreateFuelDto): Promise<void> {
        const { fuel } = fuelDto

        const newFuel = new Fuels()
        newFuel.fuel = fuel
        newFuel.created_at = new Date()
        newFuel.updated_at = new Date()

        const fuelExists = await this.findOne({ where: { fuel: fuel } })
        if (fuelExists) throw CustomException.conflict(FuelRepository.name, `Fuel: ${fuel} already exists!`)

        try { await newFuel.save() }
        catch (error) { throw CustomException.internalServerError(FuelRepository.name, `Adding a fuel failed!. Reason: ${error.message}`) }

        throw CustomException.created(FuelRepository.name, `Fuel: ${fuel} successfully created!`)
    }

    // Edit Fuel
    async editFuel(fuelId: string, fuelDto: CreateFuelDto): Promise<void> {
        const existingFuel = await this.findOne({ where: { id: fuelId } })
        if (!existingFuel) throw CustomException.conflict(FuelRepository.name, `Fuel with id: ${fuelId} does not exist!`)

        const oldFuel = existingFuel.fuel
        const { fuel } = fuelDto
        existingFuel.fuel = fuel
        existingFuel.updated_at = new Date()

        const fuelExists = await this.findOne({ where: { fuel: fuel } })
        if (fuelExists) throw CustomException.conflict(FuelRepository.name, `Fuel: ${fuel} already exists!`)

        try { await existingFuel.save() }
        catch (error) { throw CustomException.internalServerError(FuelRepository.name, `Editing a fuel failed! Reason: ${error.message}`) }

        throw CustomException.ok(FuelRepository.name, `Fuel: ${oldFuel} successfully changed into ${fuel}!`)
    }

    // Delete Fuel
    async deleteFuel(fuelId: string): Promise<void> {
        const existingFuel = await this.findOne({ where: { id: fuelId } })
        if (!existingFuel) throw CustomException.conflict(FuelRepository.name, `Fuel with id: ${fuelId} does not exist!`)

        try { await existingFuel.remove() }
        catch (error) { throw CustomException.internalServerError(FuelRepository.name, `Deleting a fuel failed! Reason: ${error.message}`) }

        throw CustomException.ok(FuelRepository.name, `Fuel: ${existingFuel.fuel} successfully deleted!`)
    }
}