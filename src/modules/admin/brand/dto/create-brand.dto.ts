// Brand DTO
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateBrandDto {
    @IsString({ message: "Brand must be a string" })
    @IsNotEmpty({ message: "Brand is required" })
    brand: string

    @IsString({ message: "countryId must be a valud uuid string" })
    @IsUUID()
    countryId: string
}