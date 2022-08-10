import { ConflictException, HttpException, InternalServerErrorException, Logger } from "@nestjs/common";
import { Countries } from "src/entities/countries.entity";
import { Places } from "src/entities/places.entity";
import { Postals } from "src/entities/postals.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreatePlaceDto } from "./dto/create-place.dto";

@EntityRepository(Places)
export class PlaceRepository extends Repository<Places> {
    private readonly logger = new Logger(PlaceRepository.name);

    // Create Place
    async createPlace(placeDto: CreatePlaceDto): Promise<void> {
        const { place, postalId, countryId } = placeDto

        const postalExists = await Postals.findOne({ where: { id: postalId } });
        if (!postalExists) throw new HttpException('Postal does not exist!', 400);
        const countryExists = await Countries.findOne({ where: { id: countryId } });
        if (!countryExists) throw new HttpException('Country does not exist!', 400);
        const existingPlace = await this.findOne({ where: { place: place, postalId: postalId, countryId: countryId } });
        if (existingPlace) throw new HttpException('Place already exists!', 400);

        const newPlace = new Places()
        newPlace.place = place
        newPlace.postalId = postalId
        newPlace.countryId = countryId
        newPlace.created_at = new Date()
        newPlace.updated_at = new Date()

        try { await newPlace.save() }
        catch (error) { 
            this.logger.error(`Adding a place failed!. Reason: ${error.message}`); 
            throw new InternalServerErrorException();
        }

        this.logger.verbose(`Place: ${place} successfully added!`);
    }

    // Edit Place
    async editPlace(placeId: string, placeDto: CreatePlaceDto): Promise<void> {
        const newPlace = await this.findOne({ where: { id: placeId } });
        if (!newPlace) {
            this.logger.error(`Place with id: ${placeId} does not exist`);
            throw new HttpException('This place does not exist!', 409);
        }

        const { place, postalId, countryId } = placeDto
        newPlace.place = place
        newPlace.postalId = postalId
        newPlace.countryId = countryId
        newPlace.updated_at = new Date()

        const existingPlace = await this.findOne({ where: { place: place } && { postalId: postalId } && { countryId: countryId } });
        try {
            if (!existingPlace) await newPlace.save()
            else {
                this.logger.error(`Place: ${place} already exists`);
                throw new ConflictException('This place already exists!');
            }
        }
        catch (error) {
            this.logger.error(`Editing a place failed!. Reason: ${error.message}`);
            throw new InternalServerErrorException();
        }

        this.logger.verbose(`Place: ${place} successfully edited!`);
    }

    // Delete Place
    async deletePlace(placeId: string): Promise<void> {
        const existingPlace = await this.findOne({ where: { id: placeId } });
        if (!existingPlace) {
            this.logger.error(`Place with id: ${placeId} does not exist`);
            throw new ConflictException('This place does not exist!');
        }

        const { place } = existingPlace
        try { await this.delete(placeId); }
        catch (error) {
            this.logger.error(`Deleting a place failed!. Reason: ${error.message}`);
            throw new InternalServerErrorException();
        }

        this.logger.verbose(`Place: ${place} successfully deleted!`);
    }
}