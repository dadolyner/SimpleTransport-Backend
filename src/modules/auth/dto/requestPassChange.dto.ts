// Request Password Change DTO
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
export class RequestPassChangeDto {
    @ApiProperty({ type: String, description: 'User new password', example: 'janeznovak321' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({ message: 'Email must be an email' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string
}
