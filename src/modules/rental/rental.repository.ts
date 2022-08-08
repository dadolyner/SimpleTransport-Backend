import { Logger } from "@nestjs/common";
import { Rentals } from "src/entities/rentals.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Rentals)
export class RentalRepository extends Repository<Rentals> {
    private readonly logger = new Logger(RentalRepository.name);
}