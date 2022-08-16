// Postal DTO
import { IsNotEmpty, IsString } from "class-validator"

export class CreatePostalDto {
    @IsString({ message: "Postal office must be a string" })
    @IsNotEmpty({ message: "Postal office is required" })
    post_office: string

    @IsString({ message: "Postal number must be a string" })
    @IsNotEmpty({ message: "Postal number is required" })
    post_code: string
}