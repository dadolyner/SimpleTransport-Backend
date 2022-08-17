// Rental DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateRentalDto {
    @ApiProperty({ type: String, description: 'Rental start date format(YYYY-MM-DD HH:mm)' })
    @IsString({ message: "rent_start must be a string" })
    @IsNotEmpty({ message: "rent_start is required" })
    rent_start: string

    @ApiProperty({ type: String, description: 'Rental end date format(YYYY-MM-DD HH:mm)' })
    @IsString({ message: "rent_end must be a string" })
    @IsNotEmpty({ message: "rent_end is required" })
    rent_end: string

    @ApiProperty({ type: String, description: 'Rental vehicleId' })
    @IsString({ message: "vehicle_id must be a valid uuid string" })
    @IsUUID()
    vehicleId: string
}