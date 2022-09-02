// Rental Repository
import { Brands } from "src/entities/brands.entity"
import { Models } from "src/entities/models.entity"
import { Rentals } from "src/entities/rentals.entity"
import { Users } from "src/entities/users.entity"
import { Vehicles } from "src/entities/vehicles.entities"
import { CustomException } from "src/helpers/custom.exception"
import { getRentDuration } from "src/helpers/rentDuration"
import transporter from "src/mail/mail.config"
import RentMailTemplate from "src/mail/rentMail.template"
import { Between, EntityRepository, MoreThan, Repository } from "typeorm"
import { RentalDto } from "./dto/rental.dto"

@EntityRepository(Rentals)
export class RentalRepository extends Repository<Rentals> {

    // Create Rental
    async createRental(user: Users, rentalDto: RentalDto): Promise<void> {
        const { rent_start, rent_end, vehicleId } = rentalDto

        const userExists = await Users.findOne(user)
        if (!userExists) throw CustomException.badRequest(RentalRepository.name, `Provided user does not exist.`)
        const vehicleExists = await Vehicles.findOne({ where: { id: vehicleId } })
        if (!vehicleExists) throw CustomException.badRequest(RentalRepository.name, `Provided vehicle does not exist.`)
        const rentalExist = await this.findOne({ where: { vehicleId: vehicleId, rent_end: MoreThan(new Date(rent_start)) } })
        if (rentalExist) throw CustomException.conflict(RentalRepository.name, `Selected car is not available in the selected time period.`)
        if(getRentDuration(rent_start, rent_end) > vehicleExists.rent_duration) throw CustomException.badRequest(RentalRepository.name, `Rental duration is greater than the vehicle's rent duration.`)

        const rental = new Rentals()
        rental.rent_start = new Date(rent_start)
        rental.rent_end = new Date(rent_end)
        rental.userId = userExists.id
        rental.vehicleId = vehicleExists.id
        rental.created_at = new Date()
        rental.updated_at = new Date()

        const vehicleOwner = await Users.findOne({ where: { id: vehicleExists.userId } })
        if (!vehicleOwner) throw CustomException.badRequest(RentalRepository.name, `Vehicle owner does not exist.`)
        const vehicleModel = await Models.findOne({ where: { id: vehicleExists.modelId } })
        if (!vehicleModel) throw CustomException.badRequest(RentalRepository.name, `Vehicle model does not exist.`)
        const vehicleBrand = await Brands.findOne({ where: { id: vehicleModel.brandId } })
        if (!vehicleBrand) throw CustomException.badRequest(RentalRepository.name, `Vehicle brand does not exist.`)

        await transporter.sendMail({
            from: '"Simple Transport Support" <support@simpletransport.com>',
            to: userExists.email,
            subject: 'Password change request',
            html: RentMailTemplate(`${userExists.first_name} ${userExists.last_name}`, `${vehicleOwner.first_name} ${vehicleOwner.last_name}`, `${vehicleBrand.brand} ${vehicleModel.model}`, `${rent_start}`, `${rent_end}`),
        })

        try { await this.save(rental) }
        catch (error) { throw CustomException.internalServerError(RentalRepository.name, `Creating a rental failed. Reason: ${error.message}.`) }

        throw CustomException.created(RentalRepository.name, `User ${userExists.first_name} ${userExists.last_name} <${userExists.email}> successfully rented a vehicle ${vehicleExists.id}.`)
    }

    // Edit Rental
    async editRental(user: Users, rentalId: string, rentalDto: RentalDto): Promise<void> {
        const { rent_start, rent_end, vehicleId } = rentalDto

        const existingRental = await this.findOne({ where: { id: rentalId } })
        if (!existingRental) throw CustomException.badRequest(RentalRepository.name, `Provided rental does not exist.`)
        const userExists = await Users.findOne(user)
        if (!userExists) throw CustomException.badRequest(RentalRepository.name, `Provided user does not exist.`)
        const vehicleExists = await Vehicles.findOne({ where: { id: vehicleId } })
        if (!vehicleExists) throw CustomException.badRequest(RentalRepository.name, `Provided vehicle does not exist.`)
        const rentalExist = await this.findOne({ where: { vehicleId: vehicleId, rent_start: Between(rent_start, rent_end), rent_end: Between(rent_start, rent_end) } })
        if (rentalExist) throw CustomException.conflict(RentalRepository.name, `Selected car is not available in the selected time period.`)
        const userHasRental = await this.findOne({ where: { id: rentalId, userId: userExists.id } })
        if (!userHasRental) throw CustomException.badRequest(RentalRepository.name, `Current user does not have this rental.`)
        if(getRentDuration(rent_start, rent_end) > vehicleExists.rent_duration) throw CustomException.badRequest(RentalRepository.name, `Rental duration is greater than the vehicle's rent duration.`)

        existingRental.rent_start = new Date(rent_start)
        existingRental.rent_end = new Date(rent_end)
        existingRental.userId = userExists.id
        existingRental.vehicleId = vehicleExists.id
        existingRental.updated_at = new Date()

        try { await this.save(existingRental) }
        catch (error) { throw CustomException.internalServerError(RentalRepository.name, `Editing a rental failed. Reason: ${error.message}.`) }

        throw CustomException.ok(RentalRepository.name, `Rental by ${userExists.first_name} ${userExists.last_name} <${userExists.email}> for ${vehicleExists.id} successfully edited.`)
    }

    // Delete Rental
    async deleteRental(user: Users, rentalId: string): Promise<void> {
        const existingRental = await this.findOne({ where: { id: rentalId } })
        if (!existingRental) throw CustomException.badRequest(RentalRepository.name, `Provided rental does not exist.`)
        const userExists = await Users.findOne(user)
        if (!userExists) throw CustomException.badRequest(RentalRepository.name, `Provided user does not exist.`)
        const userHasRental = await this.findOne({ where: { id: rentalId, userId: userExists.id } })
        if (!userHasRental) throw CustomException.badRequest(RentalRepository.name, `Current user does not have this rental.`)

        try { await existingRental.remove() }
        catch (error) { throw CustomException.internalServerError(RentalRepository.name, `Deleting a rental failed. Reason: ${error.message}.`) }

        throw CustomException.ok(RentalRepository.name, `Rental ${rentalId} successfully deleted.`)
    }
}