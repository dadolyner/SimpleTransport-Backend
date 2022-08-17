// Image Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Images } from 'src/entities/images.entity'
import { CustomException } from 'src/helpers/custom.exception'
import { QueryFilters } from 'src/helpers/queryFilter'
import { ImageDto } from './dto/image.dto'
import { ImageRepository } from './image.repository'

@Injectable()
export class ImageService {
    private readonly logger = new Logger(ImageService.name)
    constructor(@InjectRepository(ImageRepository) private readonly imageRepostory: ImageRepository) {}

    // Get Images
    async getImages(imageFilters: string): Promise<Images[]> {
        try {
            const images = await this.imageRepostory.createQueryBuilder()
                .select([
                    'image.id',
                    'image.url',
                ])
                .from(Images, 'image')
                .where(...QueryFilters(imageFilters))
                .getMany()

            this.logger.verbose(`Retrieving images. Found ${images.length} items.`)
            return images
        }
        catch (error) { throw CustomException.internalServerError(ImageService.name, `Retrieving images failed. Reason: ${error.message}.`) }
    }

    // Create Image
    async createImage(imageDto: ImageDto): Promise<void> {
        await this.imageRepostory.createImage(imageDto)
    }

    // Edit Image
    async editImage(imageId: string, imageDto: ImageDto): Promise<void> {
        await this.imageRepostory.editImage(imageId, imageDto)
    }

    // Delete Image
    async deleteImage(imageId: string): Promise<void> {
        await this.imageRepostory.deleteImage(imageId)
    }
}
