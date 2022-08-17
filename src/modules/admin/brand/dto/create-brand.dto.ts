// Brand DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateBrandDto {
    @ApiProperty({ type: String, description: 'Brand Name' })
    @IsString({ message: "Brand must be a string" })
    @IsNotEmpty({ message: "Brand is required" })
    brand: string

    @ApiProperty({ type: String, description: 'Brand countryId' })
    @IsString({ message: "countryId must be a valud uuid string" })
    @IsUUID()
    countryId: string
}