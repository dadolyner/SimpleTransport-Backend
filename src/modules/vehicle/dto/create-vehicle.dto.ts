// Vehicle DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"

export class CreateVehicleDto {
    @ApiProperty({ type: Number, description: 'Vehicle number of seats' })
    @IsNumber()
    @IsNotEmpty({message: "Seats are required"})
    seats: number

    @ApiProperty({ type: String, description: 'Vehicle type of shifter' })
    @IsString({ message: "Shifter must be a string" })
    @IsNotEmpty({message: "Shifter is required"})
    shifter: string

    @ApiProperty({ type: Number, description: 'Vehicle horsepower' })
    @IsNumber()
    @IsNotEmpty({message: "Horsepower is required"})
    horsepower: number

    @ApiProperty({ type: Number, description: 'Vehicle torque' })
    @IsNumber()
    @IsNotEmpty({message: "Torque is required"})
    torque: number

    @ApiProperty({ type: Number, description: 'Vehicle acceleration' })
    @IsNumber()
    @IsNotEmpty({message: "Acceleration is required"})
    acceleration: number

    @ApiProperty({ type: String, description: 'Vehicle year' })
    @IsString({ message: "Year must be a string" })
    year: string

    @ApiProperty({ type: Number, description: 'Vehicle price' })
    @IsNumber()
    @IsNotEmpty({message: "Price is required"})
    price: number

    @ApiProperty({ type: Number, description: 'Vehicle rent duration' })
    @IsNumber()
    @IsNotEmpty({message: "Rent duration plate is required"})
    rent_duration: number

    @ApiProperty({ type: String, description: 'Vehicle licence plate' })
    @IsString({ message: "Licence Plate must be a string" })
    @IsNotEmpty({message: "Licence is required"})
    licence_plate: string

    @ApiProperty({ type: String, description: 'Vehicle vin' })
    @IsString({ message: "Vin must be a string" })
    @IsNotEmpty({message: "Vin is required"})
    vin: string

    @ApiProperty({ type: String, description: 'Vehicle modelId' })
    @IsString({ message: "Model must be a valid uuid string" })
    @IsUUID()
    modelId: string

    @ApiProperty({ type: String, description: 'Vehicle colorId' })
    @IsString({ message: "Color must be a valid uuid string" })
    @IsUUID()
    colorId: string

    @ApiProperty({ type: String, description: 'Vehicle fuelId' })
    @IsString({ message: "Fuel must be a valid uuid string" })
    @IsUUID()
    fuelId: string
}