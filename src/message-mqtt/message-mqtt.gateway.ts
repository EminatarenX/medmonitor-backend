import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageMqttService } from './message-mqtt.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: true, namespace: 'mqtt'})
export class MessageMqttGateway {
  constructor(private readonly messageMqttService: MessageMqttService) {}

  @WebSocketServer() wss: Server;

  handleConnection(client: Socket) {
   
  }

  handleDisconnect(client: Socket) {
   
  }

  @SubscribeMessage('register')
  handleMessage(client: Socket, payload: any) {
    
  }
}
