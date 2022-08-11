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
    async getPostals(postalFilters: string): Promise<Postals[]> {
        const postalsQuery = this.postalRepository.createQueryBuilder()
            .select([
                'postal.id',
                'postal.post_office',
                'postal.post_number',
            ])
            .from(Postals, 'postal')
            .where(postalFilters)

        const postals = await postalsQuery.getMany()
        this.logger.verbose(`Retrieving postals. Found ${postals.length} items.`)

        return postals
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
