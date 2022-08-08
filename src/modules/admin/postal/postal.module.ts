// Postal Module
import { PostalService } from './postal.service';
import { PostalController } from './postal.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostalRepository } from './postal.repository';
@Module({
    imports: [TypeOrmModule.forFeature([PostalRepository])],
    controllers: [PostalController],
    providers: [PostalService],
})
export class PostalModule { }
