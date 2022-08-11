// Rental DTO
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateRentalDto {
    @IsString({ message: "rent_start must be a string" })
    @IsNotEmpty({ message: "rent_start is required" })
    rent_start: string

    @IsString({ message: "rent_end must be a string" })
    @IsNotEmpty({ message: "rent_end is required" })
    rent_end: string
    
    @IsString({ message: "user_id must be a valid uuid string" })
    @IsUUID()
    userId: string

    @IsString({ message: "vehicle_id must be a valid uuid string" })
    @IsUUID()
    vehicleId: string
}