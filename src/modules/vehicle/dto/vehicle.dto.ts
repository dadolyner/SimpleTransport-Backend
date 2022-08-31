// Vehicle DTO
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
export class VehicleDto {
    @ApiProperty({ type: Number, description: 'Vehicle seats', example: 4 })
    @IsNumber({}, { message: 'Seats must be a number' })
    @IsNotEmpty({ message: 'Seats are required' })
    seats: number

    @ApiProperty({ type: String, description: 'Vehicle shifter', example: 'Manual' })
    @IsString({ message: 'Shifter must be a string' })
    @IsNotEmpty({ message: 'Shifter is required' })
    shifter: string

    @ApiProperty({ type: Number, description: 'Vehicle horsepower', example: 100 })
    @IsNumber({}, { message: 'Horsepower must be a number' })
    @IsNotEmpty({ message: 'Horsepower is required' })
    horsepower: number

    @ApiProperty({ type: Number, description: 'Vehicle torque', example: 80 })
    @IsNumber({}, { message: 'Torque must be a number' })
    @IsNotEmpty({ message: 'Torque is required' })
    torque: number

    @ApiProperty({ type: Number, description: 'Vehicle acceleration', example: 5 })
    @IsNumber({}, { message: 'Acceleration must be a number' })
    @IsNotEmpty({ message: 'Acceleration is required' })
    acceleration: number

    @ApiProperty({ type: String, description: 'Vehicle year', example: '2020' })
    @IsString({ message: 'Year must be a string' })
    @IsNotEmpty({ message: 'Year is required' })
    year: string

    @ApiProperty({ type: Number, description: 'Vehicle price', example: 500 })
    @IsNumber({}, { message: 'Price must be a number' })
    @IsNotEmpty({ message: 'Price is required' })
    price: number

    @ApiProperty({ type: Number, description: 'Vehicle rent duration', example: 7 })
    @IsNumber({}, { message: 'Rent duration must be a number' })
    @IsNotEmpty({ message: 'Rent duration is required' })
    rent_duration: number

    @ApiProperty({ type: String, description: 'Vehicle licence plate', example: 'ABC123' })
    @IsString({ message: 'Licence plate must be a string' })
    @IsNotEmpty({ message: 'Licence plate is required' })
    licence_plate: string

    @ApiProperty({ type: String, description: 'Vehicle vin', example: '12345678901234567' })
    @IsString({ message: 'Vin must be a string' })
    @IsNotEmpty({ message: 'Vin is required' })
    vin: string

    @ApiProperty({ type: String, description: 'Vehicle modelId', example: 'f4b0c0c0-0c0c-4c0c-0c0c-0c0c0c0c0c0c' })
    @IsString({ message: 'modelId must be a valid uuid string' })
    @IsNotEmpty({ message: 'modelId is required' })
    @IsUUID()
    modelId: string

    @ApiProperty({ type: String, description: 'Vehicle colorId', example: 'f4b0c0c0-0c0c-4c0c-0c0c-0c0c0c0c0c0c' })
    @IsString({ message: 'colorId must be a valid uuid string' })
    @IsNotEmpty({ message: 'colorId is required' })
    @IsUUID()
    colorId: string

    @ApiProperty({ type: String, description: 'Vehicle fuelId', example: 'f4b0c0c0-0c0c-4c0c-0c0c-0c0c0c0c0c0c' })
    @IsString({ message: 'fuelId must be a valid uuid string' })
    @IsNotEmpty({ message: 'fuelId is required' })
    @IsUUID()
    fuelId: string

    @ApiProperty({ type: String, description: 'Vehicle imageId', example: 'f4b0c0c0-0c0c-4c0c-0c0c-0c0c0c0c0c0c' })
    @IsString({ message: 'imageId must be a valid uuid string' })
    @IsNotEmpty({ message: 'imageId is required' })
    imageUrl: string
}