// Authorization Repository
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Users } from '../../entities/users.entity'
import * as bcrypt from 'bcrypt'
import { AuthSignUpCredentialsDto } from './dto/auth-credentials-signup.dto'
import { Logger } from '@nestjs/common'
import { AuthChangeInfoDto } from './dto/auth-changeInfo.dto'
import { AuthChangePasswordDto } from './dto/auth-changePassword.dto'
import transporter from '../../mail/mail.config'
import MailTemplate from '../../mail/mail.template'
import { CustomException } from 'src/helpers/custom.exception'

@EntityRepository(Users)
export class AuthRepository extends Repository<Users> {
    private readonly logger = new Logger(AuthRepository.name)

    // Register user
    async register(signupCredentials: AuthSignUpCredentialsDto): Promise<void> {
        const { first_name, last_name, email, username, password, placeId } = signupCredentials

        const user = new Users()
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.username = username
        user.salt = await bcrypt.genSalt()
        user.password = await user.hashPassword(password, user.salt)
        user.placeId = placeId
        user.created_at = new Date()
        user.updated_at = new Date()

        const userExists = await this.findOne({ where: [{ email }, { username }] })
        if (userExists) throw CustomException.conflict(AuthRepository.name, 'User already exists!')

        try { await this.save(user) }
        catch (error) { throw CustomException.internalServerError(AuthRepository.name, `Adding a user failed! Reason: ${error.message}`) }

        throw CustomException.created(AuthRepository.name, `User with email: ${email} successfully registered!`)
    }

    // Change user information
    async changeUserInfo(user: Users, userInfo: AuthChangeInfoDto): Promise<void> {
        const { id } = user
        const { first_name, last_name, email, username } = userInfo

        const userExists = await this.findOne({ where: { id } })
        if (!userExists) throw CustomException.notFound(AuthRepository.name, `User with id: ${id} does not exist!`)

        userExists.first_name = first_name
        userExists.last_name = last_name
        userExists.email = email
        userExists.username = username

        try { await this.save(userExists) }
        catch (error) { throw CustomException.internalServerError(AuthRepository.name, `Changing user info failed! Reason: ${error.message}`) }

        throw CustomException.ok(AuthRepository.name, `User with id: ${id} successfully changed its info!`)
    }

    // Send request password mail to user
    async requestPasswordChange(userEmail: string): Promise<void> {
        const userExists = await this.findOne({ where: { email: userEmail } })
        if (!userExists) throw CustomException.notFound(AuthRepository.name, `User with email: ${userEmail} does not exist!`)

        const { first_name, last_name, email } = userExists
        const passRequestToken = await userExists.generateToken(64)
        const passRequestTokenExpiryDate = new Date(new Date().getTime() + 600000)
        userExists.passRequestToken = passRequestToken
        userExists.passRequestTokenExpiryDate = passRequestTokenExpiryDate

        await transporter.sendMail({
            from: '"Simple Transport Support" <support@simpletransport.com>',
            to: email,
            subject: 'Password change request',
            html: MailTemplate(first_name, last_name, `${process.env.SERVER_IP}/change-password?token=${passRequestToken}`),
        })

        try { await this.save(userExists) }
        catch (error) { throw CustomException.internalServerError(AuthRepository.name, `Sending password change request failed! Reason: ${error.message}`) }

        throw CustomException.ok(AuthRepository.name, `Password change request successfully sent!`)
    }

    // Change user password
    async changePassword(token: string, changePassword: AuthChangePasswordDto): Promise<void> {
        const userWithToken = await this.findOne({ where: { passRequestToken: token } })
        if (!userWithToken) throw CustomException.notFound(AuthRepository.name, `Token does not exist!`)
        if (userWithToken.passRequestTokenExpiryDate < new Date()) throw CustomException.notFound(AuthRepository.name, `Token expired!`)

        const { newPassword } = changePassword

        userWithToken.password = await userWithToken.hashPassword(newPassword, userWithToken.salt)
        userWithToken.passRequestToken = null
        userWithToken.passRequestTokenExpiryDate = null

        try { await this.save(userWithToken) }
        catch (error) { throw CustomException.internalServerError(AuthRepository.name, `Changing password failed! Reason: ${error.message}`) }

        throw CustomException.ok(AuthRepository.name, `Password successfully changed!`)
    }
}
