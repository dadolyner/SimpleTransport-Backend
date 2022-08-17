// Place DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreatePlaceDto {
    @ApiProperty({ type: String, description: 'Place name' })
    @IsString({ message: "Place must be a string!" })
    @IsNotEmpty({ message: "Place is required!" })
    place: string

    @ApiProperty({ type: String, description: 'Place postalId' })
    @IsString({ message: "postalId must be a valid uuid string!" })
    @IsUUID()
    postalId: string

    @ApiProperty({ type: String, description: 'Place countryId' })
    @IsString({ message: "countryId must be a valid uuid string!" })
    @IsUUID()
    countryId: string
}