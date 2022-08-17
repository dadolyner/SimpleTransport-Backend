// Brand DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"
export class BrandDto {
    @ApiProperty({ type: String, description: 'Brand name', example: 'Dacia' })
    @IsString({ message: "Brand must be a string" })
    @IsNotEmpty({ message: "Brand is required" })
    brand: string
    
    @ApiProperty({ type: String, description: 'Brand countryId', example: 'f4b0c0c0-0c0c-4c0c-0c0c-0c0c0c0c0c0c' })
    @IsString({ message: "countryId must be a valud uuid string" })
    @IsNotEmpty({ message: "countryId is required" })
    @IsUUID()
    countryId: string
}