import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface clients {
    [id: string]: {
      socket: Socket;
      user: any;
    };
  }
  
@Injectable()
export class MessageMqttService {
    private connectedClients: clients = {};

    
}
