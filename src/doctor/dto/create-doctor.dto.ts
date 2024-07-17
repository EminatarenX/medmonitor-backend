import { Transform } from "class-transformer"
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, Min } from "class-validator"

export class CreateDoctorDto {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @Transform( ({ value }) => value && new Date(value))
    @IsDate()
    birthDate: Date

    @IsNotEmpty()
    @IsString()
    specialty: string

    @Transform( ({ value }) => value && new Date(value))
    @IsDate()
    joinDate: Date

    @IsOptional()
    experience: string

    @IsOptional()
    education: string   

    @IsNotEmpty()
    @IsString()
    gender: string

    @IsOptional()
    phone: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    area: string
}
