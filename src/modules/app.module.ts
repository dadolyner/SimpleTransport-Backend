import { UserModule } from './user/user.module'
import { PostalModule } from './admin/postal/postal.module'
import { PlaceModule } from './admin/place/place.module'
import { ModelModule } from './admin/model/model.module'
import { FuelModule } from './admin/fuel/fuel.module'
import { CountryModule } from './admin/country/country.module'
import { ColorModule } from './admin/color/color.module'
import { BrandModule } from './admin/brand/brand.module'
import { TypeOrmConfig } from 'src/config/config.typeorm'
import { AuthModule } from './auth/auth.module'
import { VehicleModule } from './vehicle/vehicle.module'
import { RentalModule } from './rental/rental.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [
        TypeOrmConfig,
        BrandModule,
        ColorModule,
        CountryModule,
        FuelModule,
        ModelModule,
        PlaceModule,
        PostalModule,
        AuthModule,
        RentalModule,
        UserModule,
        VehicleModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
