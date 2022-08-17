// Country DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateCountryDto {
    @ApiProperty({ type: String, description: 'Country name' })
    @IsString({ message: "Country must be a string" })
    @IsNotEmpty({ message: "Country is required" })
    country: string

    @ApiProperty({ type: String, description: 'Country abbreviation' })
    @IsString({ message: "Abbreviation must be a string" })
    @IsNotEmpty({ message: "Abbreviation is required" })
    abbreviation: string
}