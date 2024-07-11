import { IsNotEmpty } from "class-validator";

export class CreateMessageDto {

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    chatId: string;

    @IsNotEmpty()
    to: string;
}