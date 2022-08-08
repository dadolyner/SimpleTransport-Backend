import { Logger } from "@nestjs/common";
import { Vehicles } from "src/entities/vehicles.entities";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Vehicles)
export class VehicleRepository extends Repository<Vehicles> {
    private readonly logger = new Logger(VehicleRepository.name);
}