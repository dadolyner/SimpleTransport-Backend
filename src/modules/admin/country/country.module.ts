// Country Module
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [CountryController],
    providers: [CountryService],
})
export class CountryModule { }
