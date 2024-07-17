import { IsEmail, IsNotEmpty } from "class-validator";

export class CreatePatientHospitalDto {

      @IsNotEmpty()
      name: string;
      @IsNotEmpty()
      lastName: string;
      @IsNotEmpty()
      @IsEmail()
      email: string;
      @IsNotEmpty()
      phone: string;
      @IsNotEmpty()
      birthDate: Date;
      role?: string;
      @IsNotEmpty()
      gender: string;
      address?: string;
      @IsNotEmpty()
      doctorId: string;

}