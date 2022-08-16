// ChangeInfo DTO
import { IsEmail, IsString } from 'class-validator'

export class AuthChangeInfoDto {
    @IsString()
    first_name: string

    @IsString()
    last_name: string

    @IsEmail({ message: 'This is not an email!' })
    email: string

    @IsString()
    username: string
}
