import { IsEmail, IsNotEmpty } from "class-validator";

export class CreatePatientDto {

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
      birthDate: Date | string;
      role?: string;
      @IsNotEmpty()
      gender: string;
      address?: string;
      doctorId: string;

}