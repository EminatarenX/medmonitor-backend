import { IsNotEmpty } from "class-validator";

export class CreateChatDto {

    @IsNotEmpty()
    doctorId: string;

    
}

export class CreateChatDoctorDto {
    
        @IsNotEmpty()
        patientId: string;  
}