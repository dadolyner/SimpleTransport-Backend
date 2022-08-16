// Vehicle DTO
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"

export class CreateVehicleDto {
    @IsNumber()
    @IsNotEmpty({message: "Seats are required"})
    seats: number

    @IsString({ message: "Shifter must be a string" })
    @IsNotEmpty({message: "Shifter is required"})
    shifter: string

    @IsNumber()
    @IsNotEmpty({message: "Horsepower is required"})
    horsepower: number

    @IsNumber()
    @IsNotEmpty({message: "Torque is required"})
    torque: number

    @IsNumber()
    @IsNotEmpty({message: "Acceleration is required"})
    acceleration: number

    @IsString({ message: "Year must be a string" })
    year: string

    @IsNumber()
    @IsNotEmpty({message: "Price is required"})
    price: number

    @IsNumber()
    @IsNotEmpty({message: "Rent duration plate is required"})
    rent_duration: number

    @IsString({ message: "Licence Plate must be a string" })
    @IsNotEmpty({message: "Licence is required"})
    licence_plate: string

    @IsString({ message: "Vin must be a string" })
    @IsNotEmpty({message: "Vin is required"})
    vin: string

    @IsString({ message: "Model must be a valid uuid string" })
    @IsUUID()
    modelId: string

    @IsString({ message: "Color must be a valid uuid string" })
    @IsUUID()
    colorId: string

    @IsString({ message: "Fuel must be a valid uuid string" })
    @IsUUID()
    fuelId: string
}