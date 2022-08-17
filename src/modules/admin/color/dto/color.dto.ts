// Color DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
export class ColorDto {
    @ApiProperty({ type: String, description: 'Color name', example: 'Formula Red' })
    @IsString({ message: "Color must be a string"})
    @IsNotEmpty({ message: "Color is required" })
    color: string
}