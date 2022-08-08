import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [VehicleController],
    providers: [VehicleService],
})
export class VehicleModule { }
