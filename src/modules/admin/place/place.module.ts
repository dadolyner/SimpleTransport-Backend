// Place Module
import { PlaceService } from './place.service'
import { PlaceController } from './place.controller'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlaceRepository } from './place.repository'
@Module({
    imports: [TypeOrmModule.forFeature([PlaceRepository])],
    controllers: [PlaceController],
    providers: [PlaceService],
})
export class PlaceModule { }
