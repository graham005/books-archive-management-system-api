import { IsDateString, IsNotEmpty, IsString, MaxLength, MinDate, MinLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(200)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(2000)
    description: string;

    @IsString()
    category: string;

    @IsNotEmpty()
    @IsDateString()
    publicationYear: number;
}
