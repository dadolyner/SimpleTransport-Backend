// Login DTO
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class AuthLoginCredentialsDto {
    @ApiPropertyOptional({ type: String, description: 'Users email.' })
    @IsEmail({ message: 'This is not an email!' })
    @IsOptional()
    email: string

    @ApiProperty({ type: String, description: 'Users username.' })
    @IsString({ message: 'Username is not a string!' })
    @MaxLength(100, { message: 'Username is too long!' })
    @IsOptional()
    username: string

    @ApiPropertyOptional({ type: String, description: 'Users password.' })
    @IsString({ message: 'Password is not a string!' })
    @MinLength(8, { message: 'Password is too short!' })
    @MaxLength(100, { message: 'Password is too long!' })
    password: string
}
