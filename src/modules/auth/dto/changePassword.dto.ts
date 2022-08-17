// ChangePassword DTO
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
export class ChangePasswordDto {
    @ApiProperty({ type: String, description: 'User new password', example: 'janeznovak321' })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password is too short!' })
    @MaxLength(255, { message: 'Password is too long!' })
    password: string
}
