// Model Module
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [ModelController],
    providers: [ModelService],
})
export class ModelModule { }
