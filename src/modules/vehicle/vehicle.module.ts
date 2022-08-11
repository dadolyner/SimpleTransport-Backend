import { VehicleService } from './vehicle.service'
import { VehicleController } from './vehicle.controller'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VehicleRepository } from './vehicle.repository'

@Module({
    imports: [TypeOrmModule.forFeature([VehicleRepository])],
    controllers: [VehicleController],
    providers: [VehicleService],
})
export class VehicleModule { }
