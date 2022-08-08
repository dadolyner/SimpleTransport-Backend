import { Logger } from "@nestjs/common";
import { Brands } from "src/entities/brands.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Brands)
export class BrandRepository extends Repository<Brands> {
    private readonly logger = new Logger(BrandRepository.name);
}