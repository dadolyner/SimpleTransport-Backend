// Color DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateColorDto {
    @ApiProperty({ type: String, description: 'Color Name' })
    @IsString({ message: "Color must be a string"})
    @IsNotEmpty({ message: "Color is required" })
    color: string
}