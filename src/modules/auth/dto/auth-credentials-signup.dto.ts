// Data Transfer Object for signing up
import { IsEmail, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class AuthSignUpCredentialsDto {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail({ message: 'This is not an email!' })
    email: string;

    @IsString()
    @MinLength(4, { message: 'Username must be at least 4 characters long!' })
    @MaxLength(100, { message: 'Username is too long!' })
    username: string;

    @IsString()
    @MinLength(8, { message: 'Password is too short!' })
    @MaxLength(100, { message: 'Password is too long!' })
    password: string;
}
