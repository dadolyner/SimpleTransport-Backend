// ChangeInfo DTO
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class AuthChangeInfoDto {
    @ApiProperty({ type: String, description: 'Users first name.' })
    @IsString()
    first_name: string

    @ApiProperty({ type: String, description: 'Users last name.' })
    @IsString()
    last_name: string

    @ApiProperty({ type: String, description: 'Users email.' })
    @IsEmail({ message: 'This is not an email!' })
    email: string

    @ApiProperty({ type: String, description: 'Users username.' })
    @IsString()
    username: string
}
