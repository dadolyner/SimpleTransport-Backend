import { TypeOrmConfig } from 'src/config/config.typeorm';
import { AuthModule } from './auth/auth.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { RentalModule } from './rental/rental.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmConfig, AuthModule, VehicleModule, RentalModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
