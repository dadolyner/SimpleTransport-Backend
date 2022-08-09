// Place Service
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Places } from 'src/entities/places.entity';
import { PlaceRepository } from './place.repository';

@Injectable()
export class PlaceService {
    constructor(
        @InjectRepository(PlaceRepository) private readonly placeRepository: PlaceRepository,
    ) { }

    // Get places
    async getPlaces(placeId: string): Promise<Places[]> {
        let places = this.placeRepository.createQueryBuilder()
            .select([
                'place.id',
                'place.place',
                'postal.post_office',
                'postal.post_number',
                'country.country',
            ])
            .from(Places, 'place')
            .innerJoin('place.postal', 'postal')
            .innerJoin('place.country', 'country')
        if(placeId) places = places.where('place.id = :id', { id: placeId });

        return await places.getMany();
    }

    // Create place
    async createPlace(placeDto: Places): Promise<void> {
        await this.placeRepository.createPlace(placeDto);
    }

    // Edit place
    async editPlace(placeId: string, placeDto: Places): Promise<void> {
        await this.placeRepository.editPlace(placeId, placeDto);
    }

    // Delete place
    async deletePlace(placeId: string): Promise<void> {
        await this.placeRepository.deletePlace(placeId);
    }
}
