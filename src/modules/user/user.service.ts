// User Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from 'src/entities/users.entity'
import { CustomException } from 'src/helpers/custom.exception'
import { UsersOutput } from 'src/interfaces/users-output.interface'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) { }

    // Get logged in user info
    async getUserInfo(user: Users): Promise<UsersOutput> {
        const userExists = await this.userRepository.findOne({ id: user.id })
        if (!userExists) throw CustomException.badRequest(UserService.name, `Provided user does not exist.`)

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
                    'postal.post_code',
                    'userCountry.id',
                    'userCountry.country',
                    'rental.id',
                    'rental.rent_start',
                    'rental.rent_end',
                    'rental.vehicleId',
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

            const output = {
                user: {
                    id: userInfo.id,
                    first_name: userInfo.first_name,
                    last_name: userInfo.last_name,
                    email: userInfo.email,
                    username: userInfo.username,
                    place: userInfo.place.place,
                    post_office: userInfo.place.postal.post_office,
                    post_code: userInfo.place.postal.post_code,
                    country: userInfo.place.country.country,
                },
                rental: userInfo.rental.map(rental => {
                    return {
                        id: rental.id,
                        rent_start: rental.rent_start,
                        rent_end: rental.rent_end,
                        vehicleId: rental.vehicleId,
                    }
                }),
                vehicle: userInfo.vehicle.map(vehicle => {
                    return {
                        id: vehicle.id,
                        seats: vehicle.seats,
                        shifter: vehicle.shifter,
                        horsepower: vehicle.horsepower,
                        torque: vehicle.torque,
                        acceleration: vehicle.acceleration,
                        year: vehicle.year,
                        price: vehicle.price,
                        rent_duration: vehicle.rent_duration,
                        licence_plate: vehicle.licence_plate,
                        vin: vehicle.vin,
                        color: vehicle.color.color,
                        fuel: vehicle.fuel.fuel,
                        model: vehicle.model.model,
                        brand: vehicle.model.brand.brand,
                        country: vehicle.model.brand.country.country
                    }
                })
            }

            this.logger.verbose(`Retrieved info for user ${user.first_name} ${user.last_name} <${user.email}>.`)
            return output
        }
        catch (error) { throw CustomException.internalServerError(UserService.name, `Retrieving user info failed. Reason: ${error}.`) }
    }

    // Get user info by his id
    async getUserInfoById(userId: string): Promise<UsersOutput> {
        const userExists = await this.userRepository.findOne({ id: userId })
        if (!userExists) throw CustomException.badRequest(UserService.name, `Provided user does not exist.`)

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
                    'postal.post_code',
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

                const output = {
                    user: {
                        id: userInfo.id,
                        first_name: userInfo.first_name,
                        last_name: userInfo.last_name,
                        email: userInfo.email,
                        username: userInfo.username,
                        place: userInfo.place.place,
                        post_office: userInfo.place.postal.post_office,
                        post_code: userInfo.place.postal.post_code,
                        country: userInfo.place.country.country,
                    },
                    rental: userInfo.rental.map(rental => {
                        return {
                            id: rental.id,
                            rent_start: rental.rent_start,
                            rent_end: rental.rent_end
                        }
                    }),
                    vehicle: userInfo.vehicle.map(vehicle => {
                        return {
                            id: vehicle.id,
                            seats: vehicle.seats,
                            shifter: vehicle.shifter,
                            horsepower: vehicle.horsepower,
                            torque: vehicle.torque,
                            acceleration: vehicle.acceleration,
                            year: vehicle.year,
                            price: vehicle.price,
                            rent_duration: vehicle.rent_duration,
                            licence_plate: vehicle.licence_plate,
                            vin: vehicle.vin,
                            color: vehicle.color.color,
                            fuel: vehicle.fuel.fuel,
                            model: vehicle.model.model,
                            brand: vehicle.model.brand.brand,
                            country: vehicle.model.brand.country.country
                        }
                    })
                }

                this.logger.verbose(`Retrieved info for user ${userExists.first_name} ${userExists.last_name} <${userExists.email}>.`)
            return output
        }
        catch (error) { throw CustomException.internalServerError(UserService.name, `Retrieving user info failed. Reason: ${error}.`) }
    }
}
