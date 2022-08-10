// Country DTO
import { IsNotEmpty, IsString } from "class-validator"

export class CreateCountryDto {
    @IsString({ message: "Country must be a string" })
    @IsNotEmpty({ message: "Country is required" })
    country: string

    @IsString({ message: "Abbreviation must be a string" })
    @IsNotEmpty({ message: "Abbreviation is required" })
    abbreviation: string
}