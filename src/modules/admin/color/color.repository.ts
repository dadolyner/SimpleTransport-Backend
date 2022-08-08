import { Logger } from "@nestjs/common";
import { Colors } from "src/entities/colors.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Colors)
export class ColorRepository extends Repository<Colors> {
    private readonly logger = new Logger(ColorRepository.name);
}