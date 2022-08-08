import { Logger } from "@nestjs/common";
import { Users } from "src/entities/users.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
    private readonly logger = new Logger(UserRepository.name);
}