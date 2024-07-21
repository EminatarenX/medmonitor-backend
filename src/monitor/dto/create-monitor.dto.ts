import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateMonitorDto {

    @IsNotEmpty()
    @IsString()
    patientId: string;

    @IsNotEmpty()
    channel: string;

}
