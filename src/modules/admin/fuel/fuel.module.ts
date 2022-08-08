// Fuel Module
import { FuelService } from './fuel.service';
import { FuelController } from './fuel.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuelRepository } from './fuel.repository';
@Module({
    imports: [TypeOrmModule.forFeature([FuelRepository])],
    controllers: [FuelController],
    providers: [FuelService],
})
export class FuelModule { }
