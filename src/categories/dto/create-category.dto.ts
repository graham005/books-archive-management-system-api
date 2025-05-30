import { IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()      
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @IsOptional()
    @MaxLength(500)
    description: string;
}
