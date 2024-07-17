import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';
import { MessageRepository } from './message-mqtt.repository';

interface clients {
    [id: string]: {
      socket: Socket;
      user: any;
    };
  }
  
@Injectable()
export class MessageMqttService {
    private connectedClients: clients = {};

    constructor(private readonly messageRepostory: MessageRepository) {}
    
    async savedMessage(payload:any) {

      return this.messageRepostory.savedMessage(payload);


    }
}
