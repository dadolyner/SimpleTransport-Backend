// Image DTO
import { IsNotEmpty, IsString } from "class-validator";

export class CreateImageDto {
    @IsString({ message: 'Image url is not a string' })
    @IsNotEmpty({ message: 'Image url is required' })
    url: string
}