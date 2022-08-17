// Model DTO
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"
export class ModelDto {
    @ApiProperty({ type: String, description: 'Model name', example: 'Sandero' })
    @IsString({ message: 'Model must be a string' })
    @IsNotEmpty({ message: 'Model is required' })
    model: string
    
    @ApiProperty({ type: String, description: 'Model brandId', example: 'f4b0c0c0-0c0c-4c0c-0c0c-0c0c0c0c0c0c' })
    @IsString({ message: 'brandId must be a valid uuid string' })
    @IsNotEmpty({ message: 'brandId is required' })
    @IsUUID()
    brandId: string
}