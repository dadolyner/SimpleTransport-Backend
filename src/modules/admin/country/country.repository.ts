import { Logger } from "@nestjs/common";
import { Countries } from "src/entities/countries.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Countries)
export class CountryRepository extends Repository<Countries> {
    private readonly logger = new Logger(CountryRepository.name);
}