// Postal Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Postals } from 'src/entities/postals.entity'
import { CreatePostalDto } from './dto/create-postal.dto'
import { PostalRepository } from './postal.repository'

@Injectable()
export class PostalService {
    private readonly logger = new Logger(PostalService.name)
    constructor(@InjectRepository(PostalRepository) private readonly postalRepository: PostalRepository) {}

    // Get Postals
    async getPostals(postalId: string): Promise<Postals[]> {
        if (postalId) {
            const postals = await this.postalRepository.find({ where: { id: postalId } })
            this.logger.verbose(`Retrieving postal with id: ${postalId}. Found ${postals.length} items.`)
            return postals
        } else {
            const postals = await this.postalRepository.find()
            this.logger.verbose(`Retrieving all postals. Found ${postals.length} items.`)
            return postals
        }
    }

    // Create Postal
    async createPostal(postalDto: CreatePostalDto): Promise<void> {
        await this.postalRepository.createPostal(postalDto)
    }

    // Edit Postal
    async editPostal(postalId: string, postalDto: CreatePostalDto): Promise<void> {
        await this.postalRepository.editPostal(postalId, postalDto)
    }

    // Delete Postal
    async deletePostal(postalId: string): Promise<void> {
        await this.postalRepository.deletePostal(postalId)
    }
}
