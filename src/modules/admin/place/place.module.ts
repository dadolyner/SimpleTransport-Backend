// Place Module
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [PlaceController],
    providers: [PlaceService],
})
export class PlaceModule { }
