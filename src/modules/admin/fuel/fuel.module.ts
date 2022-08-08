// Fuel Module
import { FuelService } from './fuel.service';
import { FuelController } from './fuel.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [FuelController],
    providers: [FuelService],
})
export class FuelModule { }
