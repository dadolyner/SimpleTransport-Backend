import { IsString } from "class-validator";

export class CreateCountryDto {
    @IsString()
    country: string;

    @IsString()
    abbreviation: string;
}