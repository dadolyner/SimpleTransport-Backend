// Config for database connection
import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rentals } from 'src/entities/rentals.entity';
import { Users } from 'src/entities/users.entity';
import { Vehicles } from 'src/entities/vehicles.entities';

@Module({
    imports: [ 
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService : ConfigService) => ({
                type: 'postgres',
	            host: configService.get<string>('DATABASE_HOST'),
	            port: +configService.get<number>('DATABASE_PORT'),
	            username: configService.get<string>('DATABASE_USER'),
	            password: configService.get<string>('DATABASE_PASSWORD'),
	            database: configService.get<string>('DATABASE_NAME'),
	            entities: [Users, Rentals, Vehicles],
	            synchronize: true,
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [],
})
export class TypeOrmConfig { }