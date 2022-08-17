// SignUp DTO
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator'

export class AuthSignUpCredentialsDto {
    @ApiProperty({ type: String, description: 'Users first name.' })
    @IsString()
    first_name: string

    @ApiProperty({ type: String, description: 'Users last name.' })
    @IsString()
    last_name: string

    @ApiProperty({ type: String, description: 'Users email.' })
    @IsEmail({ message: 'This is not an email' })
    email: string

    @ApiProperty({ type: String, description: 'Users username.' })
    @IsString()
    @MinLength(4, { message: 'Username must be at least 4 characters long' })
    @MaxLength(100, { message: 'Username is too long' })
    username: string

    @ApiProperty({ type: String, description: 'Users password.' })
    @IsString()
    @MinLength(8, { message: 'Password is too short' })
    @MaxLength(100, { message: 'Password is too long' })
    password: string

    @ApiProperty({ type: String, description: 'Users imageId.' })
    @IsOptional()
    @IsString({ message: 'imageId must be a valid uuid string' })
    @IsUUID()
    imageId: string

    @ApiProperty({ type: String, description: 'Users placeId.' })
    @IsString({ message: 'placeId must be a valid uuid string' })
    @IsUUID()
    placeId: string
}
