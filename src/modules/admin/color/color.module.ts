// Color Module
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [ColorController],
    providers: [ColorService],
})
export class ColorModule { }
