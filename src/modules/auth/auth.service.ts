// Auth Service
import { Injectable } from '@nestjs/common'
import { LoginCredentialsDto } from './dto/login.dto'
import { AuthRepository } from './auth.repository'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt/jwt-payload.interface'
import { SignupCredentialsDto } from './dto/signup.dto'
import { Logger } from '@nestjs/common'
import { Users } from '../../entities/users.entity'
import { ChangeInfoDto } from './dto/changeInfo.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ChangePasswordDto } from './dto/changePassword.dto'
import { CustomException } from 'src/helpers/custom.exception'
import { RequestPassChangeDto } from './dto/requestPassChange.dto'

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        @InjectRepository(AuthRepository) private readonly authRepository: AuthRepository,
        private jwtService: JwtService,
    ) { }

    // Register user
    async register(signupCredentials: SignupCredentialsDto): Promise<void> {
        return this.authRepository.register(signupCredentials)
    }

    // Login user
    async logIn(userCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
        const { email, username, password } = userCredentialsDto

        const userExists = await this.authRepository.findOne({ where: [{ email }, { username }] })
        if (!userExists) throw CustomException.badRequest(AuthService.name, 'Provided user does not exist.')
        const isPasswordValid = await userExists.validatePassword(password)
        if (!isPasswordValid) throw CustomException.badRequest(AuthService.name, 'User entered invalid credentials.')

        const payload: JwtPayload = { email }
        const accessToken = this.jwtService.sign(payload)

        try {
            this.logger.verbose(`User ${userExists.first_name} ${userExists.last_name} <${userExists.email}> <${userExists.username}> successfully logged in.`)
            return { accessToken }
        } catch (error) { throw CustomException.internalServerError(AuthService.name, `Login failed. Reason: ${error.message}.`) }
    }

    // Change user information
    async changeUserInfo(user: Users, userInfo: ChangeInfoDto): Promise<void> {
        return this.authRepository.changeUserInfo(user, userInfo)
    }

    // Request password reset
    async requestPasswordChange(userEmail: RequestPassChangeDto): Promise<void> {
        return this.authRepository.requestPasswordChange(userEmail)
    }

    // Update user password
    async changePassword(token: string, changePassword: ChangePasswordDto): Promise<void> {
        return this.authRepository.changePassword(token, changePassword)
    }
}
