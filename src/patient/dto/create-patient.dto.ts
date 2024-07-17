import { IsEmail, IsNotEmpty } from "class-validator"

export class CreatePatientDto {

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    lastName: string
    
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsNotEmpty()
    gender: string
    
    @IsNotEmpty()
    birthDate: Date
    
    @IsNotEmpty()
    phone: string
    
    @IsNotEmpty()
    address: string

}
