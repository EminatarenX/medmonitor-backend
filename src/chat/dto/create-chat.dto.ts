import { IsNotEmpty } from "class-validator";

export class CreateChatDto {

    @IsNotEmpty()
    doctorId: string;
}
