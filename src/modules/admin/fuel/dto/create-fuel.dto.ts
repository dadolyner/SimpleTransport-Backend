import { IsString } from "class-validator";

export class CreateFuelDto {
    @IsString()
    fuel: string;
}