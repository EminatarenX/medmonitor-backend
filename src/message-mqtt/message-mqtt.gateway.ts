import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageMqttService } from './message-mqtt.service';
import { Server, Socket } from 'socket.io'

@WebSocketGateway({cors: true, namespace: 'mqtt'})

export class MessageMqttGateway {
  
  constructor(private readonly messageMqttService: MessageMqttService) {}

  @WebSocketServer() wss: Server;

  handleConnection(client: Socket) {
   console.log('client connected')
  }

  handleDisconnect(client: Socket) {
    
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    console.log('message', {payload})
    // TODO: Emitir todos los datos el front wss.to().emit('health/motior', payload)
    //this.wss.emit('health/monitor', payload);

    console.log(payload);

    // TODO: Guardar en la base de datos
    //this.messageMqttService.savedMessage(payload);
    
  }
}
