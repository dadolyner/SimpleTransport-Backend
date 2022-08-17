// Postal DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
export class PostalDto {
    @ApiProperty({ type: String, description: 'Postal post office', example: 'Gornji Grad' })
    @IsString({ message: "Post office must be a string" })
    @IsNotEmpty({ message: "Post office is required" })
    post_office: string

    @ApiProperty({ type: String, description: 'Postal post code', example: '3342' })
    @IsString({ message: "Post code must be a string" })
    @IsNotEmpty({ message: "Post code is required" })
    post_code: string
}