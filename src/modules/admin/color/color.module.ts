// Color Module
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorRepository } from './color.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ColorRepository])],
    controllers: [ColorController],
    providers: [ColorService],
})
export class ColorModule { }
