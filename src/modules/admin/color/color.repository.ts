import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import { Colors } from "src/entities/colors.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateColorDto } from "./dto/create-color.dto";

@EntityRepository(Colors)
export class ColorRepository extends Repository<Colors> {
    private readonly logger = new Logger(ColorRepository.name);

    // Create Color
    async createColor(colorDto: CreateColorDto): Promise<void> {
        const { color } = colorDto;

        const newColor = new Colors()
        newColor.color = color
        newColor.created_at = new Date()
        newColor.updated_at = new Date()

        try { await newColor.save() }
        catch (error) {
            if (error.code == 23505) {
                this.logger.error(`Color: ${color} already exists`);
                throw new ConflictException('This color already exists!');
            } else {
                this.logger.error(`Adding a color failed!. Reason: ${error.message}`);
                throw new InternalServerErrorException();
            }
        }

        this.logger.verbose(`Color: ${color} successfully added!`);
    }

    // Edit Color
    async editColor(colorId: string, colorDto: CreateColorDto): Promise<void> {
        const existingColor = await this.findOne({ where: { id: colorId } });
        if (!existingColor) {
            this.logger.error(`Color with id: ${colorId} does not exist`);
            throw new ConflictException('This color does not exist!');
        }
        
        const { color } = colorDto;
        existingColor.color = color
        existingColor.updated_at = new Date()
        
        try { await existingColor.save() }
        catch (error) {
            if (error.code == 23505) {
                this.logger.error(`Color: ${color} already exists`);
                throw new ConflictException('This color already exists!');
            } else {
                this.logger.error(`Editing a color failed!. Reason: ${error.message}`);
                throw new InternalServerErrorException();
            }
        }

        this.logger.verbose(`Color: ${color} successfully edited!`);
    }

    // Delete Color
    async deleteColor(colorId: string): Promise<void> {
        const existingColor = await this.findOne({ where: { id: colorId } });
        if (!existingColor) {
            this.logger.error(`Color with id: ${colorId} does not exist`);
            throw new ConflictException('This color does not exist!');
        }

        try { await existingColor.remove() }
        catch (error) {
            this.logger.error(`Deleting a color failed!. Reason: ${error.message}`);
            throw new InternalServerErrorException();
        }

        this.logger.verbose(`Color: ${existingColor.color} successfully deleted!`);
    }
}