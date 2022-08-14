// JWT Strategy
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { Users } from '../../../entities/users.entity'
import { AuthRepository } from '../auth.repository'
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(AuthRepository) private authRepository: AuthRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        })
    }

    async validate(payload: JwtPayload): Promise<Users> {
        const { email } = payload
        const user = await this.authRepository.findOne({ where: { email } })

        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}
