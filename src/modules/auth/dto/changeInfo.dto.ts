// ChangeInfo DTO
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
export class ChangeInfoDto {
    @ApiProperty({ type: String, description: 'User first name', example: 'Janez' })
    @IsString({ message: 'First name must be a string' })
    @IsNotEmpty({ message: 'First name is required' })
    first_name: string

    @ApiProperty({ type: String, description: 'User last name', example: 'Novak' })
    @IsString({ message: 'Last name must be a string' })
    @IsNotEmpty({ message: 'Last name is required' })
    last_name: string

    @ApiProperty({ type: String, description: 'Users email', example: 'janez.novak@gmail.com' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({ message: 'Email must be an email' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string

    @ApiProperty({ type: String, description: 'Users username', example: 'novakjanez' })
    @IsString({ message: 'Username must be a string' })
    @IsNotEmpty({ message: 'Username is required' })
    @MinLength(8, { message: 'Username is too short!' })
    @MaxLength(255, { message: 'Username is too long!' })
    username: string
}
