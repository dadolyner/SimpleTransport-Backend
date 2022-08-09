//Authorization Service
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginCredentialsDto } from './dto/auth-credentials-login.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { AuthSignUpCredentialsDto } from './dto/auth-credentials-signup.dto';
import { Logger } from '@nestjs/common';
import { Users } from '../../entities/users.entity';
import { AuthChangeInfoDto } from './dto/auth-changeInfo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthChangePasswordDto } from './dto/auth-changePassword.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        @InjectRepository(AuthRepository) private readonly authRepository: AuthRepository,
        private jwtService: JwtService,
    ) { }

    // Register user
    async register(signupCredentials: AuthSignUpCredentialsDto): Promise<void> {
        return this.authRepository.register(signupCredentials);
    }

    // Login user
    async logIn(userCredentialsDto: AuthLoginCredentialsDto): Promise<{ accessToken: string }> {
        try {
            const { email, username, password } = userCredentialsDto;

            const exists = await this.authRepository.findOne({ where: [{ email }, { username }] });
            if (!exists) {
                email ? this.logger.error(`User with email: ${userCredentialsDto.email} does not exist!`) : this.logger.error(`User with username: ${userCredentialsDto.username} does not exist!`);
                throw new UnauthorizedException('Email not exists');
            }

            const validate = await exists.validatePassword(password);
            if (!validate) { this.logger.error(`User tried to login but has entered Invalid credentials`); throw new UnauthorizedException('Invalid credentials'); }

            const payload: JwtPayload = { email };
            const accessToken = this.jwtService.sign(payload);

            email ? this.logger.verbose(`User with email: ${userCredentialsDto.email} logged in!`) : this.logger.verbose(`User with username: ${userCredentialsDto.username} logged in!`);

            return { accessToken };
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    // Change user information
    async changeUserInfo(user: Users, userInfo: AuthChangeInfoDto): Promise<void> {
        return this.authRepository.changeUserInfo(user, userInfo);
    }

    // Request password reset
    async requestPasswordChange(userEmail: string): Promise<{ passRequestToken: string }> {
        return this.authRepository.requestPasswordChange(userEmail);
    }

    // Update user password
    async changePassword(token: string, changePassword: AuthChangePasswordDto): Promise<void> {
        return this.authRepository.changePassword(token, changePassword);
    }
}
