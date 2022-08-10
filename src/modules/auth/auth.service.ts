//Authorization Service
import { Injectable } from '@nestjs/common'
import { AuthLoginCredentialsDto } from './dto/auth-credentials-login.dto'
import { AuthRepository } from './auth.repository'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt/jwt-payload.interface'
import { AuthSignUpCredentialsDto } from './dto/auth-credentials-signup.dto'
import { Logger } from '@nestjs/common'
import { Users } from '../../entities/users.entity'
import { AuthChangeInfoDto } from './dto/auth-changeInfo.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthChangePasswordDto } from './dto/auth-changePassword.dto'
import { CustomException } from 'src/HttpException/custom.exception'

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        @InjectRepository(AuthRepository) private readonly authRepository: AuthRepository,
        private jwtService: JwtService,
    ) { }

    // Register user
    async register(signupCredentials: AuthSignUpCredentialsDto): Promise<void> {
        return this.authRepository.register(signupCredentials)
    }

    // Login user
    async logIn(userCredentialsDto: AuthLoginCredentialsDto): Promise<{ accessToken: string }> {
        const { email, username, password } = userCredentialsDto

        const userExists = await this.authRepository.findOne({ where: [{ email }, { username }] })
        if (!userExists) throw CustomException.badRequest(AuthService.name, 'User not found')
        const isPasswordValid = await userExists.validatePassword(password)
        if (!isPasswordValid) throw CustomException.badRequest(AuthService.name, 'Invalid credentials')

        const payload: JwtPayload = { email }
        const accessToken = this.jwtService.sign(payload)

        try {
            email ? this.logger.verbose(`User with email: ${userCredentialsDto.email} logged in!`) : this.logger.verbose(`User with username: ${userCredentialsDto.username} logged in!`)
            return { accessToken }
        } catch (error) { throw CustomException.internalServerError(AuthService.name, `Login failed! Reason: ${error.message}`) }
    }

    // Change user information
    async changeUserInfo(user: Users, userInfo: AuthChangeInfoDto): Promise<void> {
        return this.authRepository.changeUserInfo(user, userInfo)
    }

    // Request password reset
    async requestPasswordChange(userEmail: string): Promise<void> {
        return this.authRepository.requestPasswordChange(userEmail)
    }

    // Update user password
    async changePassword(token: string, changePassword: AuthChangePasswordDto): Promise<void> {
        return this.authRepository.changePassword(token, changePassword)
    }
}
