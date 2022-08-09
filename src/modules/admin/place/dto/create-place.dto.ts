import { IsString, IsUUID } from "class-validator";

export class CreatePlaceDto {
    @IsString()
    place: string;

    @IsString()
    @IsUUID()
    postalId: string;

    @IsString()
    @IsUUID()
    countryId: string;
}