// Place Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Places } from 'src/entities/places.entity'
import { CustomException } from 'src/helpers/custom.exception'
import { AndQueryFilters } from 'src/helpers/queryFilter'
import { PlacesOutput } from 'src/interfaces/place-output.interface'
import { PlaceDto } from './dto/place.dto'
import { PlaceRepository } from './place.repository'

@Injectable()
export class PlaceService {
    private readonly logger = new Logger(PlaceService.name)
    constructor(@InjectRepository(PlaceRepository) private readonly placeRepository: PlaceRepository) { }

    // Get places
    async getPlaces(placeFilters: string): Promise<PlacesOutput[]> {
        try {
            const places = await this.placeRepository.createQueryBuilder()
                .select([
                    'place.id',
                    'place.place',
                    'postal.post_office',
                    'postal.post_code',
                    'country.country',
                ])
                .from(Places, 'place')
                .leftJoin('place.postal', 'postal')
                .leftJoin('place.country', 'country')
                .where(...AndQueryFilters(placeFilters))
                .getMany()


            const output = places.map(place => {
                return {
                    id: place.id,
                    place: place.place,
                    post_office: place.postal.post_office,
                    post_code: place.postal.post_code,
                    country: place.country.country,
                }
            })

            this.logger.verbose(`Retrieving places. Found ${places.length} items.`)
            return output
        }
        catch(error) { throw CustomException.internalServerError(PlaceService.name, `Retrieving places failed. Reason: ${error.message}`) }
    }

    // Create place
    async createPlace(placeDto: PlaceDto): Promise<void> {
        await this.placeRepository.createPlace(placeDto)
    }

    // Edit place
    async editPlace(placeId: string, placeDto: PlaceDto): Promise<void> {
        await this.placeRepository.editPlace(placeId, placeDto)
    }

    // Delete place
    async deletePlace(placeId: string): Promise<void> {
        await this.placeRepository.deletePlace(placeId)
    }
}
