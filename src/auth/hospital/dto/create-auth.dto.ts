import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: 'El correo electrónico no es valido' })
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}
