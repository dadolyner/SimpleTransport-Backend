// Fuel Repository
import { Fuels } from "src/entities/fuels.entity"
import { CustomException } from "src/helpers/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { CreateFuelDto } from "./dto/create-fuel.dto"

@EntityRepository(Fuels)
export class FuelRepository extends Repository<Fuels> {

    // Create Fuel
    async createFuel(fuelDto: CreateFuelDto): Promise<void> {
        const { fuel } = fuelDto

        const fuelExists = await this.findOne({ where: { fuel: fuel } })
        if (fuelExists) throw CustomException.conflict(FuelRepository.name, `Fuel ${fuel} already exists.`)

        const newFuel = new Fuels()
        newFuel.fuel = fuel
        newFuel.created_at = new Date()
        newFuel.updated_at = new Date()

        try { await newFuel.save() }
        catch (error) { throw CustomException.internalServerError(FuelRepository.name, `Adding a fuel failed. Reason: ${error.message}.`) }

        throw CustomException.created(FuelRepository.name, `Fuel ${fuel} successfully created.`)
    }

    // Edit Fuel
    async editFuel(fuelId: string, fuelDto: CreateFuelDto): Promise<void> {
        const { fuel } = fuelDto
        
        const existingFuel = await this.findOne({ where: { id: fuelId } })
        if (!existingFuel) throw CustomException.badRequest(FuelRepository.name, `Provided fuel does not exist.`)
        const fuelExists = await this.findOne({ where: { fuel: fuel } })
        if (fuelExists) throw CustomException.conflict(FuelRepository.name, `Fuel ${fuel} already exists.`)

        const oldFuel = existingFuel.fuel
        existingFuel.fuel = fuel
        existingFuel.updated_at = new Date()

        try { await existingFuel.save() }
        catch (error) { throw CustomException.internalServerError(FuelRepository.name, `Editing a fuel failed. Reason: ${error.message}.`) }

        throw CustomException.ok(FuelRepository.name, `Fuel ${oldFuel} successfully edited.`)
    }

    // Delete Fuel
    async deleteFuel(fuelId: string): Promise<void> {
        const existingFuel = await this.findOne({ where: { id: fuelId } })
        if (!existingFuel) throw CustomException.badRequest(FuelRepository.name, `Provided fuel does not exist.`)

        try { await existingFuel.remove() }
        catch (error) { throw CustomException.internalServerError(FuelRepository.name, `Deleting a fuel failed. Reason: ${error.message}.`) }

        throw CustomException.ok(FuelRepository.name, `Fuel ${existingFuel.fuel} successfully deleted.`)
    }
}