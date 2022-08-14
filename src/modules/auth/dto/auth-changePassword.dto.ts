// Data Transfer Object for changing password
import { IsString, MaxLength, MinLength } from 'class-validator'

export class AuthChangePasswordDto {
    @IsString()
    @MinLength(8, { message: 'Password is too short!' })
    @MaxLength(100, { message: 'Password is too long!' })
    newPassword: string
}
