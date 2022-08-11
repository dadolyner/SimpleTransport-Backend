// Rental Repository
import { Rentals } from "src/entities/rentals.entity"
import { Users } from "src/entities/users.entity"
import { Vehicles } from "src/entities/vehicles.entities"
import { CustomException } from "src/HttpException/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { CreateRentalDto } from "./dto/create-rental.dto"

@EntityRepository(Rentals)
export class RentalRepository extends Repository<Rentals> {

    // Create Rental
    async createRental(rentalDto: CreateRentalDto): Promise<void> {
        const { rent_start, rent_end, userId, vehicleId } = rentalDto

        const userExists = await Users.findOne({ where: { id: userId } })
        if (!userExists) throw CustomException.badRequest(RentalRepository.name, `User with id ${userId} does not exist`)
        const vehicleExists = await Vehicles.findOne({ where: { id: vehicleId } })
        if (!vehicleExists) throw CustomException.badRequest(RentalRepository.name, `Vehicle with id ${vehicleId} does not exist`)

        const rental = new Rentals()
        rental.rent_start = new Date(rent_start)
        rental.rent_end = new Date(rent_end)
        rental.userId = userId
        rental.vehicleId = vehicleId
        rental.created_at = new Date()
        rental.updated_at = new Date()

        try { await this.save(rental) }
        catch (error) { throw CustomException.internalServerError(RentalRepository.name, `Creating a rental failed! Reason: ${error.message}`) }

        throw CustomException.created(RentalRepository.name, `Rental for user: ${userId} and vehicle: ${vehicleId} successfully created!`)
    }

    // Edit Rental
    async editRental(rentalId: string, rentalDto: CreateRentalDto): Promise<void> {
        const existingRental = await this.findOne({ where: { id: rentalId } })
        if (!existingRental) throw CustomException.notFound(RentalRepository.name, `Rental with id ${rentalId} does not exist`)

        const { rent_start, rent_end, userId, vehicleId } = rentalDto
        const userExists = await Users.findOne({ where: { id: userId } })
        if (!userExists) throw CustomException.badRequest(RentalRepository.name, `User with id ${userId} does not exist`)
        const vehicleExists = await Vehicles.findOne({ where: { id: vehicleId } })
        if (!vehicleExists) throw CustomException.badRequest(RentalRepository.name, `Vehicle with id ${vehicleId} does not exist`)

        existingRental.rent_start = new Date(rent_start)
        existingRental.rent_end = new Date(rent_end)
        existingRental.userId = userId
        existingRental.vehicleId = vehicleId
        existingRental.updated_at = new Date()

        try { await this.save(existingRental) }
        catch (error) { throw CustomException.internalServerError(RentalRepository.name, `Editing a rental failed! Reason: ${error.message}`) }

        throw CustomException.ok(RentalRepository.name, `Rental with id ${rentalId} successfully edited!`)
    }

    // Delete Rental
    async deleteRental(rentalId: string): Promise<void> {
        const existingRental = await this.findOne({ where: { id: rentalId } })
        if (!existingRental) throw CustomException.notFound(RentalRepository.name, `Rental with id ${rentalId} does not exist`)

        try { await existingRental.remove() }
        catch (error) { throw CustomException.internalServerError(RentalRepository.name, `Deleting a rental failed! Reason: ${error.message}`) }

        throw CustomException.ok(RentalRepository.name, `Rental with id ${rentalId} successfully deleted!`)
    }
}