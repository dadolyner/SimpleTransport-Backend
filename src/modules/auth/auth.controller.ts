// Auth Controller
import { Body, Controller, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Users } from '../../entities/users.entity'
import { AuthService } from './auth.service'
import { GetUser } from './decorator/get-user.decorator'
import { AuthChangeInfoDto } from './dto/auth-changeInfo.dto'
import { AuthChangePasswordDto } from './dto/auth-changePassword.dto'
import { AuthLoginCredentialsDto } from './dto/auth-credentials-login.dto'
import { AuthSignUpCredentialsDto } from './dto/auth-credentials-signup.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Register user
    @Post('/register')
    register(@Body(ValidationPipe) authSignupCredentialsDto: AuthSignUpCredentialsDto): Promise<void> {
        return this.authService.register(authSignupCredentialsDto)
    }

    // Login user
    @Post('/login')
    logIn(@Body(ValidationPipe) authCredentialsDto: AuthLoginCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.logIn(authCredentialsDto)
    }

    // Change user info
    @UseGuards(AuthGuard('jwt'))
    @Patch('/change-user-info')
    changeUserInfo(@GetUser() user: Users, @Body() userInfo: AuthChangeInfoDto): Promise<void> {
        return this.authService.changeUserInfo(user, userInfo)
    }

    // Request password reset
    @Post('/request-password-change')
    requestPasswordChange(@Body('email') userEmail: string): Promise<void> {
        return this.authService.requestPasswordChange(userEmail)
    }

    // Change user password
    @Patch('/change-password')
    changePassword(@Query('token') token: string, @Body() changePassword: AuthChangePasswordDto): Promise<void> {
        return this.authService.changePassword(token, changePassword)
    }
}
