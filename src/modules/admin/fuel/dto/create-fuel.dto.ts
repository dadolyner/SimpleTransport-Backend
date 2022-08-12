import { IsNotEmpty, IsString } from "class-validator"

export class CreateFuelDto {
    @IsString({ message: "Fuel must be a string" })
    @IsNotEmpty({ message: "Fuel is required" })
    fuel: string
}