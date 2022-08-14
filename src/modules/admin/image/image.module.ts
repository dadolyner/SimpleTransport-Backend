// Image Module
import { ImageService } from './image.service'
import { ImageController } from './image.controller'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageRepository } from './image.repository'

@Module({
    imports: [TypeOrmModule.forFeature([ImageRepository])],
    controllers: [ImageController],
    providers: [ImageService],
})
export class ImageModule { }
