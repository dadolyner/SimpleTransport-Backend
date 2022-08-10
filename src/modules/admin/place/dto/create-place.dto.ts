// Place DTO
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreatePlaceDto {
    @IsString({ message: "Place must be a string!" })
    @IsNotEmpty({ message: "Place is required!" })
    place: string

    @IsString({ message: "postalId must be a valid uuid string!" })
    @IsUUID()
    postalId: string

    @IsString({ message: "countryId must be a valid uuid string!" })
    @IsUUID()
    countryId: string
}