// Authorization Repository
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { AuthSignUpCredentialsDto } from './dto/auth-credentials-signup.dto';
import { Logger } from '@nestjs/common';
import { AuthChangeInfoDto } from './dto/auth-changeInfo.dto';
import { AuthChangePasswordDto } from './dto/auth-changePassword.dto';
import transporter from '../../mail/mail.config';
import MailTemplate from '../../mail/mail.template';

@EntityRepository(Users)
export class AuthRepository extends Repository<Users> {
    private readonly logger = new Logger(AuthRepository.name);

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
                this.logger.error(`User with email: ${email} or username: ${username} already exists`);
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
        const { first_name, last_name, email, username } = userInfo;

        try {
            const currentUser = await this.findOne({ where: { id } });
            
            currentUser.first_name = first_name;
            currentUser.last_name = last_name;
            currentUser.email = email;
            currentUser.username = username;

            await this.save(currentUser);
            this.logger.verbose(`User ${currentUser.first_name} ${currentUser.last_name} successfully changed its information!`);
        } catch (error) {
            this.logger.error(`There was a problem changing user information. Reason: ${error.message}`);
            throw new InternalServerErrorException();
        }
    }

    // Send request password mail to user
    async requestPasswordChange(userEmail: string): Promise<{ passRequestToken: string }> {
        const currentUser = await this.findOne({ where: { email: userEmail } });
        const { first_name, last_name, email } = currentUser;

        if(!currentUser) {
            this.logger.error(`User with email: ${userEmail} does not exist!`);
            throw new UnauthorizedException();
        }

        try {
            const passRequestToken = await currentUser.generateToken(64);
            const passRequestTokenExpiryDate = new Date(new Date().getTime() + 600000);

            currentUser.passRequestToken = passRequestToken
            currentUser.passRequestTokenExpiryDate = passRequestTokenExpiryDate

            await transporter.sendMail({
                from: '"Simple Transport Support" <support@simpletransport.com>',
                to: email,
                subject: 'Password change request',
                html: MailTemplate(first_name, last_name, `${process.env.SERVER_IP}/change-password?token=${passRequestToken}`),
            });

            await this.save(currentUser);
            this.logger.verbose(`User with email: ${currentUser.email} has requested password change. Reset password token has been sent to user's email!`);
            
            return { passRequestToken }
        } catch (error) {
            this.logger.error(`User with email ${email} does not exist!`);
            throw new InternalServerErrorException();
        }
    }

    // Change user password
    async changePassword(token: string, changePassword: AuthChangePasswordDto): Promise<void> {
        const { newPassword } = changePassword;
        try {
            const currentUser = await this.findOne({ where: { passRequestToken: token } });
            if (!currentUser.passRequestToken || currentUser.passRequestTokenExpiryDate < new Date()) {
                this.logger.error(`Reset password token for user with email: ${currentUser.email} has expired!`);
                throw new UnauthorizedException();
            }

            currentUser.password = await currentUser.hashPassword(newPassword, currentUser.salt);
            currentUser.passRequestToken = null;
            currentUser.passRequestTokenExpiryDate = null;

            this.logger.verbose(`User with email: ${currentUser.email} successfully changed its password!`);
            await this.save(currentUser);
        } catch (error) { return error; }
    }
}
