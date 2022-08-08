import { Logger } from "@nestjs/common";
import { Fuels } from "src/entities/fuels.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Fuels)
export class FuelRepository extends Repository<Fuels> {
    private readonly logger = new Logger(FuelRepository.name);
}