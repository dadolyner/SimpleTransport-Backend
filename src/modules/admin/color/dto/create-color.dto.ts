// Color DTO
import { IsNotEmpty, IsString } from "class-validator"

export class CreateColorDto {
    @IsString({ message: "Color must be a string"})
    @IsNotEmpty({ message: "Color is required" })
    color: string;
}