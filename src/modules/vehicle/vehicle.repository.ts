// Vehicle Repository
import { Colors } from "src/entities/colors.entity"
import { Fuels } from "src/entities/fuels.entity"
import { Models } from "src/entities/models.entity"
import { Users } from "src/entities/users.entity"
import { Vehicles } from "src/entities/vehicles.entities"
import { CustomException } from "src/helpers/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { CreateVehicleDto } from "./dto/create-vehicle.dto"

@EntityRepository(Vehicles)
export class VehicleRepository extends Repository<Vehicles> {

    // Create vehicle
    async createVehicle(user: Users, vehicleDto: CreateVehicleDto): Promise<void> {
        const { seats, shifter, horsepower, torque, acceleration, year, price, rent_duration, licence_plate, vin, modelId, colorId, fuelId } = vehicleDto

        const userExists = await Users.findOne(user)
        if (!userExists) throw CustomException.badRequest(VehicleRepository.name, `Provided user does not exist.`)
        const modelExists = await Models.findOne({ where: { id: modelId } })
        if (!modelExists) throw CustomException.badRequest(VehicleRepository.name, `Provided model does not exist.`)
        const colorExists = await Colors.findOne({ where: { id: colorId } })
        if (!colorExists) throw CustomException.badRequest(VehicleRepository.name, `Provided color does not exist.`)
        const fuelExists = await Fuels.findOne({ where: { id: fuelId } })
        if (!fuelExists) throw CustomException.badRequest(VehicleRepository.name, `Provided fuel does not exist.`)
        const vehicleExists = await this.findOne({ where: [{ licence_plate }, { vin }] })
        if (vehicleExists) throw CustomException.conflict(VehicleRepository.name, `Vehicle with licence plate ${licence_plate} or vin number ${vin} already exists.`)

        const newVehicle = new Vehicles()
        newVehicle.seats = seats
        newVehicle.shifter = shifter
        newVehicle.horsepower = horsepower
        newVehicle.torque = torque
        newVehicle.acceleration = acceleration
        newVehicle.year = year
        newVehicle.price = price
        newVehicle.rent_duration = rent_duration
        newVehicle.licence_plate = licence_plate
        newVehicle.vin = vin
        newVehicle.userId = userExists.id
        newVehicle.modelId = modelId
        newVehicle.colorId = colorId
        newVehicle.fuelId = fuelId
        newVehicle.created_at = new Date()
        newVehicle.updated_at = new Date()

        try { await newVehicle.save() }
        catch (error) { throw CustomException.internalServerError(VehicleRepository.name, `Creating a vehicle failed. Reason: ${error.message}.`) }

        throw CustomException.created(VehicleRepository.name, `User ${userExists.first_name} ${userExists.last_name} <${userExists.email}> successfully created a new vehicle ${modelExists.brand} ${modelExists.model} with licence plate: ${licence_plate} and vin number ${vin}.`)
    }

    // Edit vehicle
    async editVehicle(user: Users, vehicleId: string, vehicleDto: CreateVehicleDto): Promise<void> {
        const { seats, shifter, horsepower, torque, acceleration, year, price, rent_duration, licence_plate, vin, modelId, colorId, fuelId } = vehicleDto

        const existingVehicle = await this.findOne({ where: { id: vehicleId } })
        if (!existingVehicle) throw CustomException.badRequest(VehicleRepository.name, `Provided vehicle does not exist.`)
        const userExists = await Users.findOne(user)
        if (!userExists) throw CustomException.badRequest(VehicleRepository.name, `Provided user does not exist.`)
        const modelExists = await Models.findOne({ where: { id: modelId } })
        if (!modelExists) throw CustomException.badRequest(VehicleRepository.name, `Model with id ${modelId} does not exist.`)
        const colorExists = await Colors.findOne({ where: { id: colorId } })
        if (!colorExists) throw CustomException.badRequest(VehicleRepository.name, `Color with id ${colorId} does not exist.`)
        const fuelExists = await Fuels.findOne({ where: { id: fuelId } })
        if (!fuelExists) throw CustomException.badRequest(VehicleRepository.name, `Fuel with id ${fuelId} does not exist.`)
        const vehicleExists = await this.findOne({ where: [{ licence_plate }, { vin }] })
        if (vehicleExists) throw CustomException.conflict(VehicleRepository.name, `Vehicle with licence plate ${licence_plate} or vin number ${vin} already exists.`)

        existingVehicle.seats = seats
        existingVehicle.shifter = shifter
        existingVehicle.horsepower = horsepower
        existingVehicle.torque = torque
        existingVehicle.acceleration = acceleration
        existingVehicle.year = year
        existingVehicle.price = price
        existingVehicle.rent_duration = rent_duration
        existingVehicle.licence_plate = licence_plate
        existingVehicle.vin = vin
        existingVehicle.userId = userExists.id
        existingVehicle.modelId = modelExists.id
        existingVehicle.colorId = colorExists.id
        existingVehicle.fuelId = fuelExists.id
        existingVehicle.updated_at = new Date()

        try { await existingVehicle.save() }
        catch (error) { throw CustomException.internalServerError(VehicleRepository.name, `Editing a vehicle failed. Reason: ${error.message}.`) }

        throw CustomException.created(VehicleRepository.name, `User ${userExists.first_name} ${userExists.last_name} <${userExists.email}> successfully edited a vehicle ${modelExists.brand} ${modelExists.model} with licence plate: ${licence_plate} and vin number ${vin}.`)
    }

    // Delete vehicle
    async deleteVehicle(vehicleId: string): Promise<void> {
        const existingVehicle = await this.findOne({ where: { id: vehicleId } })
        if (!existingVehicle) throw CustomException.badRequest(VehicleRepository.name, `Provided vehicle does not exist.`)

        try { await existingVehicle.remove() }
        catch (error) { throw CustomException.internalServerError(VehicleRepository.name, `Deleting a vehicle failed. Reason: ${error.message}.`) }

        throw CustomException.ok(VehicleRepository.name, `Vehicle ${vehicleId} successfully deleted.`)
    }
}