import { IsNotEmpty, IsString } from "class-validator";

export class PatientAuthDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}