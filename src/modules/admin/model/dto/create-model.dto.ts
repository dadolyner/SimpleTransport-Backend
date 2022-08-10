// Model DTO
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateModelDto {
    @IsString({ message: 'Model must be a string' })
    @IsNotEmpty({ message: 'Model is required' })
    model: string

    @IsString({ message: 'brandId must be a valid uuid string' })
    @IsUUID()
    brandId: string
}