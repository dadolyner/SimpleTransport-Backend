import { Logger } from "@nestjs/common";
import { Postals } from "src/entities/postals.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Postals)
export class PostalRepository extends Repository<Postals> {
    private readonly logger = new Logger(PostalRepository.name);
}