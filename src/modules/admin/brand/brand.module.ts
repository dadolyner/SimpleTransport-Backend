// Brand Module
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [BrandController],
    providers: [BrandService],
})
export class BrandModule { }
