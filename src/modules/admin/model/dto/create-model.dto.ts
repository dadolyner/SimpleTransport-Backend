// Model DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateModelDto {
    @ApiProperty({ type: String, description: 'Model name' })
    @IsString({ message: 'Model must be a string' })
    @IsNotEmpty({ message: 'Model is required' })
    model: string

    @ApiProperty({ type: String, description: 'Brand id' })
    @IsString({ message: 'brandId must be a valid uuid string' })
    @IsUUID()
    brandId: string
}