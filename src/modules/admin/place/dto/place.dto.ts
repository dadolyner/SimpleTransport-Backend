// Place DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"
export class PlaceDto {
    @ApiProperty({ type: String, description: 'Place name', example: 'Gornji Grad' })
    @IsString({ message: "Place must be a string!" })
    @IsNotEmpty({ message: "Place is required!" })
    place: string
    
    @ApiProperty({ type: String, description: 'Place postalId', example: 'f4b0c0c0-0c0c-4c0c-0c0c-0c0c0c0c0c0c' })
    @IsString({ message: "postalId must be a valid uuid string!" })
    @IsNotEmpty({ message: "postalId is required!" })
    @IsUUID()
    postalId: string
    
    @ApiProperty({ type: String, description: 'Place countryId', example: 'f4b0c0c0-0c0c-4c0c-0c0c-0c0c0c0c0c0c' })
    @IsString({ message: "countryId must be a valid uuid string!" })
    @IsNotEmpty({ message: "countryId is required!" })
    @IsUUID()
    countryId: string
}