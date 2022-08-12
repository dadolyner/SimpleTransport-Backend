// User Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Vehicles } from 'src/entities/vehicles.entities';
import { CustomException } from 'src/helpers/custom.exception';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) { }

    // Get logged in user info
    async getUserInfo(user: Users): Promise<Users> {
        const userExists = await this.userRepository.findOne({ id: user.id })
        if (!userExists) throw CustomException.badRequest(UserService.name, `User with id: ${user.id} does not exist`)

        try {
            const userInfo = await this.userRepository.createQueryBuilder()
                .select([
                    'user.id',
                    'user.first_name',
                    'user.last_name',
                    'user.email',
                    'user.username',
                    'place.id',
                    'place.place',
                    'postal.id',
                    'postal.post_office',
                    'postal.post_number',
                    'userCountry.id',
                    'userCountry.country',
                    'rental.id',
                    'rental.rent_start',
                    'rental.rent_end',
                    'vehicle.id',
                    'vehicle.seats',
                    'vehicle.shifter',
                    'vehicle.horsepower',
                    'vehicle.torque',
                    'vehicle.acceleration',
                    'vehicle.year',
                    'vehicle.price',
                    'vehicle.rent_duration',
                    'vehicle.licence_plate',
                    'vehicle.vin',
                    'color.id',
                    'color.color',
                    'fuel.id',
                    'fuel.fuel',
                    'model.id',
                    'model.model',
                    'brand.id',
                    'brand.brand',
                    'country.id',
                    'country.country',
                ])
                .from(Users, 'user')
                .leftJoin('user.place', 'place')
                .leftJoin('place.postal', 'postal')
                .leftJoin('place.country', 'userCountry')
                .leftJoin('user.rental', 'rental')
                .leftJoin('user.vehicle', 'vehicle')
                .leftJoin('vehicle.color', 'color')
                .leftJoin('vehicle.fuel', 'fuel')
                .leftJoin('vehicle.model', 'model')
                .leftJoin('model.brand', 'brand')
                .leftJoin('brand.country', 'country')
                .where('user.id = :id', { id: user.id })
                .getOne()

            this.logger.verbose(`Retrieved user info for logged in user: ${user.id}`)
            return userInfo
        }
        catch (error) { throw CustomException.internalServerError(UserService.name, `Retrieving user info failed. Reason: ${error}`) }
    }

    // Get user info by his id
    async getUserInfoById(userId: string): Promise<Users> {
        const userExists = await this.userRepository.findOne({ id: userId })
        if (!userExists) throw CustomException.badRequest(UserService.name, `User with id: ${userId} does not exist`)
        
        try {
            const userInfo = await this.userRepository.createQueryBuilder()
                .select([
                    'user.id',
                    'user.first_name',
                    'user.last_name',
                    'user.email',
                    'user.username',
                    'place.id',
                    'place.place',
                    'postal.id',
                    'postal.post_office',
                    'postal.post_number',
                    'userCountry.id',
                    'userCountry.country',
                    'rental.id',
                    'rental.rent_start',
                    'rental.rent_end',
                    'vehicle.id',
                    'vehicle.seats',
                    'vehicle.shifter',
                    'vehicle.horsepower',
                    'vehicle.torque',
                    'vehicle.acceleration',
                    'vehicle.year',
                    'vehicle.price',
                    'vehicle.rent_duration',
                    'vehicle.licence_plate',
                    'vehicle.vin',
                    'color.id',
                    'color.color',
                    'fuel.id',
                    'fuel.fuel',
                    'model.id',
                    'model.model',
                    'brand.id',
                    'brand.brand',
                    'country.id',
                    'country.country',
                ])
                .from(Users, 'user')
                .leftJoin('user.place', 'place')
                .leftJoin('place.postal', 'postal')
                .leftJoin('place.country', 'userCountry')
                .leftJoin('user.rental', 'rental')
                .leftJoin('user.vehicle', 'vehicle')
                .leftJoin('vehicle.color', 'color')
                .leftJoin('vehicle.fuel', 'fuel')
                .leftJoin('vehicle.model', 'model')
                .leftJoin('model.brand', 'brand')
                .leftJoin('brand.country', 'country')
                .where('user.id = :id', { id: userId })
                .getOne()

            this.logger.verbose(`Retrieved user info for user with id: ${userId}`)
            return userInfo
        }
        catch (error) { throw CustomException.internalServerError(UserService.name, `Retrieving user info failed. Reason: ${error}`) }
    }
}
