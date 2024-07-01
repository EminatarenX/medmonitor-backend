import { IsString } from "class-validator"

export class CreateHospitalDto {
    @IsString()
    email: string

    @IsString()
    password: string
}
