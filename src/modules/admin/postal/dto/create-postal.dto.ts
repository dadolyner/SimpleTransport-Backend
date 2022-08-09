import { IsString } from "class-validator";

export class CreatePostalDto {
    @IsString()
    post_office: string;

    @IsString()
    post_number: string;
}