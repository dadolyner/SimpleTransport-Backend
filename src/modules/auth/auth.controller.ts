// Auth Controller
import { Body, Controller, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { Users } from '../../entities/users.entity'
import { AuthService } from './auth.service'
import { GetUser } from './decorator/get-user.decorator'
import { ChangeInfoDto } from './dto/changeInfo.dto'
import { ChangePasswordDto } from './dto/changePassword.dto'
import { LoginCredentialsDto } from './dto/login.dto'
import { RequestPassChangeDto } from './dto/requestPassChange.dto'
import { SignupCredentialsDto } from './dto/signup.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Register user
    @ApiResponse({ status: 201, description: 'Creat enew user' })
    @ApiBody({ type: SignupCredentialsDto })
    @Post('/register')
    register(@Body(ValidationPipe) SignupCredentialsDto: SignupCredentialsDto): Promise<void> {
        return this.authService.register(SignupCredentialsDto)
    }

    // Login user
    @ApiResponse({ status: 201, description: 'Login existing user' })
    @ApiBody({ type: LoginCredentialsDto })
    @Post('/login')
    logIn(@Body(ValidationPipe) authCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.logIn(authCredentialsDto)
    }

    // Change user info
    @ApiResponse({ status: 200, description: 'Change user info for existing user' })
    @ApiBody({ type: ChangeInfoDto })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Patch('/change-user-info')
    changeUserInfo(@GetUser() user: Users, @Body() userInfo: ChangeInfoDto): Promise<void> {
        return this.authService.changeUserInfo(user, userInfo)
    }

    // Request password reset
    @ApiResponse({ status: 200, description: 'Request password change for existing user' })
    @ApiBody({ type: RequestPassChangeDto })
    @Post('/request-password-change')
    requestPasswordChange(@Body('email') userEmail: RequestPassChangeDto): Promise<void> {
        return this.authService.requestPasswordChange(userEmail)
    }

    // Change user password
    @ApiResponse({ status: 200, description: 'Change password for existing user' })
    @ApiQuery({ name: 'token', description: 'change password token', required: true })
    @ApiBody({ type: ChangePasswordDto })
    @Patch('/change-password')
    changePassword(@Query('token') token: string, @Body() changePassword: ChangePasswordDto): Promise<void> {
        return this.authService.changePassword(token, changePassword)
    }
}
