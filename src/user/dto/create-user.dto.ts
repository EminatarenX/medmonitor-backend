import { IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    fullname: string

    @IsString()
    telephone: string
}
