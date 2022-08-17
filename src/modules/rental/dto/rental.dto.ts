// Rental DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"
export class RentalDto {
    @ApiProperty({ type: String, description: 'Rental rent start', example: '2022-08-17 14:00' })
    @IsString({ message: "Rent start must be a string" })
    @IsNotEmpty({ message: "Rent start is required" })
    rent_start: string

    @ApiProperty({ type: String, description: 'Rental rent end', example: '2022-08-20 10:00' })
    @IsString({ message: "Rent end must be a string" })
    @IsNotEmpty({ message: "Rent end is required" })
    rent_end: string

    @ApiProperty({ type: String, description: 'Rental vehicleId', example: 'f4b0c0c0-0c0c-4c0c-0c0c-0c0c0c0c0c0c' })
    @IsString({ message: "vehicleId must be a valid uuid string" })
    @IsNotEmpty({ message: "vehicleId is required" })
    @IsUUID()
    vehicleId: string
}