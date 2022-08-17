// ChangePassword DTO
import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator'

export class AuthChangePasswordDto {
    @ApiProperty({ type: String, description: 'Users new password.' })
    @IsString()
    @MinLength(8, { message: 'Password is too short!' })
    @MaxLength(100, { message: 'Password is too long!' })
    newPassword: string
}
