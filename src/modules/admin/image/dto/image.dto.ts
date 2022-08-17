// Image DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
export class ImageDto {
    @ApiProperty({ type: String, description: 'Image url', example: 'https://test.com/testImage.png' })
    @IsString({ message: 'Image url is not a string' })
    @IsNotEmpty({ message: 'Image url is required' })
    url: string
}