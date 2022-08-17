// Config for database connection
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Brands } from 'src/entities/brands.entity'
import { Colors } from 'src/entities/colors.entity'
import { Countries } from 'src/entities/countries.entity'
import { Fuels } from 'src/entities/fuels.entity'
import { Images } from 'src/entities/images.entity'
import { Models } from 'src/entities/models.entity'
import { Places } from 'src/entities/places.entity'
import { Postals } from 'src/entities/postals.entity'
import { Rentals } from 'src/entities/rentals.entity'
import { Users } from 'src/entities/users.entity'
import { Vehicles } from 'src/entities/vehicles.entities'

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DATABASE_HOST'),
                port: +configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                entities: [Users, Rentals, Vehicles, Images, Fuels, Models, Brands, Postals, Places, Countries, Colors],
                synchronize: true,
                // logging: true,
                // logger: 'advanced-console',
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [],
})
export class TypeOrmConfig { }