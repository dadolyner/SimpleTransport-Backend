// Login DTO
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
export class LoginCredentialsDto {
    @ApiPropertyOptional({ type: String, description: 'User email' })
    @IsOptional({ message: 'Email is optional' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({ message: 'This is not an email!' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string

    @ApiProperty({ type: String, description: 'User username' })
    @IsOptional({ message: 'Username is optional' })
    @IsString({ message: 'Username is not a string!' })
    @IsNotEmpty({ message: 'Username is required' })
    username: string

    @ApiPropertyOptional({ type: String, description: 'User password' })
    @IsString({ message: 'Password is not a string!' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string
}
