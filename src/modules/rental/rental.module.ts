import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [RentalController],
    providers: [RentalService],
})
export class RentalModule { }
