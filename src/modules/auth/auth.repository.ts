// Authorization Repository
import {
    ConflictException,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthLoginCredentialsDto } from './dto/auth-credentials-login.dto';
import { Users } from '../../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { AuthSignUpCredentialsDto } from './dto/auth-credentials-signup.dto';
import { Logger } from '@nestjs/common';
import { AuthChangeInfoDto } from './dto/auth-changeInfo.dto';

@EntityRepository(Users)
export class AuthRepository extends Repository<Users> {
    private logger = new Logger('AuthRepository');

    // Register user
    async register(signupCredentials: AuthSignUpCredentialsDto): Promise<void> {
        const { first_name, last_name, email, username, password } = signupCredentials;

        const user = new Users();
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await user.hashPassword(password, user.salt);
        user.created_at = new Date();
        user.updated_at = new Date();

        try { await this.save(user) }
        catch (error) {
            if (error.code == 23505) {
                this.logger.error(`User with email: ${email} already exists`);
                throw new ConflictException('User with this email already exist!');
            } else {
                this.logger.error(`Registration failed!. Reason: ${error.message}`);
                throw new InternalServerErrorException();
            }
        }

        this.logger.verbose(`User with email: ${email} successfully registered!`);
    }

    // Change user information
    async changeUserInfo(user: Users, userInfo: AuthChangeInfoDto): Promise<void> {
        const { id } = user;
        const { first_name, last_name, email } = userInfo;

        try {
            const currentUser = await this.findOne({ where: { id } });
            currentUser.first_name = first_name;
            currentUser.last_name = last_name;
            currentUser.email = email;

            this.logger.verbose(`User ${currentUser.first_name} ${currentUser.last_name} successfully changed its information!`);
            await this.save(currentUser);
        } catch (error) {
            this.logger.error(`User with email: ${email} already exists!`);
            throw new InternalServerErrorException();
        }
    }

    // Send request password mail to user
    async requestPasswordChange(user: Users): Promise<{ passRequestToken: string }> {
        const { id } = user
        const currentUser = await this.findOne({ where: { id } });
        const { first_name, last_name, email } = currentUser;

        try {
            const passRequestToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const passRequestTokenExpiryDate = new Date(new Date().getTime() + 600000);

            currentUser.passRequestToken = passRequestToken
            currentUser.passRequestTokenExpiryDate = passRequestTokenExpiryDate

            this.logger.verbose(`User with email: ${currentUser.email} has requested password change!`);
            await this.save(currentUser);
            return { passRequestToken }
        } catch (error) {
            this.logger.error(`User with email ${email} does not exist!`);
            throw new InternalServerErrorException();
        }
    }

    // Change user password
    async changePassword(user: Users, token: string, oldPassword: string, newPassword: string): Promise<void> {
        const { id } = user
        try {
            const currentUser = await this.findOne({ where: { id } });
            if (!currentUser.passRequestToken || currentUser.passRequestTokenExpiryDate < new Date()) { this.logger.error(`Reset password token for user with email: ${currentUser.email} has expired!`); throw new UnauthorizedException(); }
            if (!await currentUser.validatePassword(oldPassword)) { this.logger.error(`User with email: ${currentUser.email} entered wrong old password!`); throw new InternalServerErrorException(); }

            currentUser.password = await currentUser.hashPassword(newPassword, currentUser.salt);
            currentUser.passRequestToken = null;
            currentUser.passRequestTokenExpiryDate = null;

            this.logger.verbose(`User with email: ${currentUser.email} successfully changed its password!`);
            await this.save(currentUser);
        } catch (error) { return error; }
    }
}
