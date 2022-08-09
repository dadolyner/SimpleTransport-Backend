import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import { Countries } from "src/entities/countries.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateCountryDto } from "./dto/create-country.dto";

@EntityRepository(Countries)
export class CountryRepository extends Repository<Countries> {
    private readonly logger = new Logger(CountryRepository.name);

    // Create Country
    async createCountry(countryDto: CreateCountryDto): Promise<void> {
        const { country, abbreviation } = countryDto;
        
        const newCountry = new Countries()
        newCountry.country = country
        newCountry.abbreviation = abbreviation
        newCountry.created_at = new Date()
        newCountry.updated_at = new Date()

        try { await newCountry.save() }
        catch (error) {
            if (error.code == 23505) {
                this.logger.error(`Country: ${country} already exists`);
                throw new ConflictException('This country already exists!');
            } else {
                this.logger.error(`Adding a country failed!. Reason: ${error.message}`);
                throw new InternalServerErrorException();
            }
        }

        this.logger.verbose(`Country: ${country} successfully added!`);
    }

    // Edit Country
    async editCountry(countryId: string, countryDto: CreateCountryDto): Promise<void> {
        const existingCountry = await this.findOne({ where: { id: countryId } });
        if (!existingCountry) {
            this.logger.error(`Country with id: ${countryId} does not exist`);
            throw new ConflictException('This country does not exist!');
        }
        
        const { country, abbreviation } = countryDto;
        existingCountry.country = country
        existingCountry.abbreviation = abbreviation
        existingCountry.updated_at = new Date()
        
        try { await existingCountry.save() }
        catch (error) {
            if (error.code == 23505) {
                this.logger.error(`Country: ${country} already exists`);
                throw new ConflictException('This country already exists!');
            } else {
                this.logger.error(`Editing a country failed!. Reason: ${error.message}`);
                throw new InternalServerErrorException();
            }
        }

        this.logger.verbose(`Country: ${country} successfully edited!`);
    }

    // Delete Country
    async deleteCountry(countryId: string): Promise<void> {
        const existingCountry = await this.findOne({ where: { id: countryId } });
        if (!existingCountry) {
            this.logger.error(`Country with id: ${countryId} does not exist`);
            throw new ConflictException('This country does not exist!');
        }

        try { await existingCountry.remove() }
        catch (error) {
            this.logger.error(`Deleting a country failed!. Reason: ${error.message}`);
            throw new InternalServerErrorException();
        }

        this.logger.verbose(`Country: ${existingCountry.country} successfully deleted!`);
    }
}