import { IsString } from "class-validator";

export class MessageDto {

    @IsString()
    id: string;
    chatId: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: Date;
    signalData?: any;
}