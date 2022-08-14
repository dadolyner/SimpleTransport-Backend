// Data transfer object for logging in
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class AuthLoginCredentialsDto {
    @IsEmail({ message: 'This is not an email!' })
    @IsOptional()
    email: string

    @IsString({ message: 'Username is not a string!' })
    @MaxLength(100, { message: 'Username is too long!' })
    @IsOptional()
    username: string

    @IsString({ message: 'Password is not a string!' })
    @MinLength(8, { message: 'Password is too short!' })
    @MaxLength(100 , { message: 'Password is too long!' })
    password: string
}
