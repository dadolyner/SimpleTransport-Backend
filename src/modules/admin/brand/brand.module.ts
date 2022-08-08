// Brand Module
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandRepository } from './brand.repository';

@Module({
    imports: [TypeOrmModule.forFeature([BrandRepository])],
    controllers: [BrandController],
    providers: [BrandService],
})
export class BrandModule { }
