// SignUp DTO
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator'
export class SignupCredentialsDto {
    @ApiProperty({ type: String, description: 'User first name', example: 'Janez' })
    @IsString({ message: 'First name must be a string' })
    @IsNotEmpty({ message: 'First name is required' })
    first_name: string

    @ApiProperty({ type: String, description: 'User last name', example: 'Novak' })
    @IsString({ message: 'Last name must be a string' })
    @IsNotEmpty({ message: 'Last name is required' })
    last_name: string

    @ApiProperty({ type: String, description: 'User email', example: 'janez.novak@gmail.com' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({ message: 'This is not an email' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string

    @ApiProperty({ type: String, description: 'User username', example: 'novakjanez' })
    @IsString({ message: 'Username must be a string' })
    @MinLength(8, { message: 'Username is too short' })
    @MaxLength(255, { message: 'Username is too long' })
    username: string

    @ApiProperty({ type: String, description: 'User password', example: 'janeznovak123' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password is too short' })
    @MaxLength(100, { message: 'Password is too long' })
    password: string

    @ApiProperty({ type: String, description: 'User placeId', example: 'f4b0c0c0-0c0c-4c0c-0c0c-0c0c0c0c0c0c' })
    @IsString({ message: 'placeId must be a valid uuid string' })
    @IsNotEmpty({ message: 'placeId is required' })
    @IsUUID()
    placeId: string
}
