// Country DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
export class CountryDto {
    @ApiProperty({ type: String, description: 'Country name', example: 'Slovenia' })
    @IsString({ message: "Country must be a string" })
    @IsNotEmpty({ message: "Country is required" })
    country: string

    @ApiProperty({ type: String, description: 'Country abbreviation', example: 'SLO' })
    @IsString({ message: "Abbreviation must be a string" })
    @IsNotEmpty({ message: "Abbreviation is required" })
    abbreviation: string
}