// Postal Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Postals } from 'src/entities/postals.entity'
import { CustomException } from 'src/helpers/custom.exception'
import { AndQueryFilters } from 'src/helpers/queryFilter'
import { PostalDto } from './dto/postal.dto'
import { PostalRepository } from './postal.repository'

@Injectable()
export class PostalService {
    private readonly logger = new Logger(PostalService.name)
    constructor(@InjectRepository(PostalRepository) private readonly postalRepository: PostalRepository) { }

    // Get Postals
    async getPostals(postalFilters: string): Promise<Postals[]> {
        try {
            const postals = await this.postalRepository.createQueryBuilder()
                .select([
                    'postal.id',
                    'postal.post_office',
                    'postal.post_code',
                ])
                .from(Postals, 'postal')
                .where(...AndQueryFilters(postalFilters))
                .getMany()

            this.logger.verbose(`Retrieving postals. Found ${postals.length} items.`)
            return postals
        }
        catch (error) { throw CustomException.internalServerError(PostalService.name, `Retrieving postals failed. Reason: ${error.message}.`) }
    }

    // Create Postal
    async createPostal(postalDto: PostalDto): Promise<void> {
        await this.postalRepository.createPostal(postalDto)
    }

    // Edit Postal
    async editPostal(postalId: string, postalDto: PostalDto): Promise<void> {
        await this.postalRepository.editPostal(postalId, postalDto)
    }

    // Delete Postal
    async deletePostal(postalId: string): Promise<void> {
        await this.postalRepository.deletePostal(postalId)
    }
}
