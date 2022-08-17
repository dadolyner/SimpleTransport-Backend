// Postal DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreatePostalDto {
    @ApiProperty({ type: String, description: 'Postal post office' })
    @IsString({ message: "Postal office must be a string" })
    @IsNotEmpty({ message: "Postal office is required" })
    post_office: string

    @ApiProperty({ type: String, description: 'Postal post code' })
    @IsString({ message: "Postal number must be a string" })
    @IsNotEmpty({ message: "Postal number is required" })
    post_code: string
}