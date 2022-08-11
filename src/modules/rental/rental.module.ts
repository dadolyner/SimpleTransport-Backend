import { RentalService } from './rental.service'
import { RentalController } from './rental.controller'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RentalRepository } from './rental.repository'

@Module({
    imports: [TypeOrmModule.forFeature([RentalRepository])],
    controllers: [RentalController],
    providers: [RentalService],
})
export class RentalModule { }
