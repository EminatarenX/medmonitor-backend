import { IsArray, IsBoolean, IsOptional, IsString, Min } from "class-validator";

export class CreateGiftDto {
    @IsString()
    name: string;

    @IsBoolean()
    @IsOptional()
    available: string

    @IsString()
    @IsOptional()
    userID: string

    @IsArray()
    @IsString({each: true})
    @IsOptional()
    urls: String[]

    image: Express.Multer.File;
}
