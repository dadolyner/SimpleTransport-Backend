// Postal Module
import { PostalService } from './postal.service';
import { PostalController } from './postal.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [PostalController],
    providers: [PostalService],
})
export class PostalModule { }
