import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateAuthorDto {

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    bio: string;

    @IsDateString()
    @IsOptional()
    birthDate: string;
}
