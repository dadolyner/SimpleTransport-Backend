// Fuel DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateFuelDto {
    @ApiProperty({ type: String, description: 'Fuel name' })
    @IsString({ message: "Fuel must be a string" })
    @IsNotEmpty({ message: "Fuel is required" })
    fuel: string
}