// Image DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateImageDto {
    @ApiProperty({ type: String, description: 'Image url' })
    @IsString({ message: 'Image url is not a string' })
    @IsNotEmpty({ message: 'Image url is required' })
    url: string
}