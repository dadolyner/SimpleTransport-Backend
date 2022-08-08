import { Logger } from "@nestjs/common";
import { Models } from "src/entities/models.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Models)
export class ModelRepository extends Repository<Models> {
    private readonly logger = new Logger(ModelRepository.name);
}