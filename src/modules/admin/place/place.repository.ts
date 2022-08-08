import { Logger } from "@nestjs/common";
import { Places } from "src/entities/places.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Places)
export class PlaceRepository extends Repository<Places> {
    private readonly logger = new Logger(PlaceRepository.name);
}