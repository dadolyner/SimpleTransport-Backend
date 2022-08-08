// Model Module
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelRepository } from './model.repository';
@Module({
    imports: [TypeOrmModule.forFeature([ModelRepository])],
    controllers: [ModelController],
    providers: [ModelService],
})
export class ModelModule { }
