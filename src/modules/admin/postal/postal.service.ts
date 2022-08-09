// Postal Service
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Postals } from 'src/entities/postals.entity';
import { CreatePostalDto } from './dto/create-postal.dto';
import { PostalRepository } from './postal.repository';

@Injectable()
export class PostalService {
    constructor(
        @InjectRepository(PostalRepository) private readonly postalRepository: PostalRepository,
    ) {}

    // Get Postals
    async getPostals(postalId: string): Promise<Postals[]> {
        if (postalId) return this.postalRepository.find({ where: { id: postalId } });
        return this.postalRepository.find();
    }

    // Create Postal
    async createPostal(postalDto: CreatePostalDto): Promise<void> {
        await this.postalRepository.createPostal(postalDto);
    }

    // Edit Postal
    async editPostal(postalId: string, postalDto: CreatePostalDto): Promise<void> {
        await this.postalRepository.editPostal(postalId, postalDto);
    }

    // Delete Postal
    async deletePostal(postalId: string): Promise<void> {
        await this.postalRepository.deletePostal(postalId);
    }
}
