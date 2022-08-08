// Country Module
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryRepository } from './country.repository';
@Module({
    imports: [TypeOrmModule.forFeature([CountryRepository])],
    controllers: [CountryController],
    providers: [CountryService],
})
export class CountryModule { }
