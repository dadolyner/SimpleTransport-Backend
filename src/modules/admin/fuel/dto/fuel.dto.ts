// Fuel DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
export class FuelDto {
    @ApiProperty({ type: String, description: 'Fuel name', example: 'Gas' })
    @IsString({ message: "Fuel must be a string" })
    @IsNotEmpty({ message: "Fuel is required" })
    fuel: string
}