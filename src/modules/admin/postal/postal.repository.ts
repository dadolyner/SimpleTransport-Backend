import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import { Postals } from "src/entities/postals.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreatePostalDto } from "./dto/create-postal.dto";

@EntityRepository(Postals)
export class PostalRepository extends Repository<Postals> {
    private readonly logger = new Logger(PostalRepository.name);

    // Create Postal
    async createPostal(postalDto: CreatePostalDto): Promise<void> {
        const { post_office, post_number } = postalDto

        const newPostal = new Postals()
        newPostal.post_office = post_office
        newPostal.post_number = post_number
        newPostal.created_at = new Date()
        newPostal.updated_at = new Date()

        try { await newPostal.save() }
        catch (error) {
            if (error.code == 23505) {
                this.logger.error(`Postal: ${post_office}-${post_number} already exists`);
                throw new ConflictException('This color already exists!');
            } else {
                this.logger.error(`Adding a postal failed!. Reason: ${error.message}`);
                throw new InternalServerErrorException();
            }
        }

        this.logger.verbose(`Postal: ${post_office}-${post_number} successfully added!`);
    }

    // Edit Postal
    async editPostal(postalId: string, postalDto: CreatePostalDto): Promise<void> {
        const existingPostal = await this.findOne({ where: { id: postalId } });
        if (!existingPostal) {
            this.logger.error(`Postal with id: ${postalId} does not exist`);
            throw new ConflictException('This postal does not exist!');
        }

        const { post_office, post_number } = postalDto
        existingPostal.post_office = post_office
        existingPostal.post_number = post_number
        existingPostal.updated_at = new Date()

        try { await existingPostal.save() }
        catch (error) {
            if (error.code == 23505) {
                this.logger.error(`Postal: ${post_office}-${post_number} already exists`);
                throw new ConflictException('This color already exists!');
            } else {
                this.logger.error(`Editing a postal failed!. Reason: ${error.message}`);
                throw new InternalServerErrorException();
            }
        }

        this.logger.verbose(`Postal: ${post_office}-${post_number} successfully edited!`);
    }

    // Delete Postal
    async deletePostal(postalId: string): Promise<void> {
        const existingPostal = await this.findOne({ where: { id: postalId } });
        const { post_office, post_number } = existingPostal

        if (!existingPostal) {
            this.logger.error(`Postal with id: ${postalId} does not exist`);
            throw new ConflictException('This postal does not exist!');
        }

        try { await existingPostal.remove() }
        catch (error) {
            this.logger.error(`Deleting a postal failed!. Reason: ${error.message}`);
            throw new InternalServerErrorException();
        }

        this.logger.verbose(`Postal: ${post_office}-${post_number} successfully deleted!`);
    }
}