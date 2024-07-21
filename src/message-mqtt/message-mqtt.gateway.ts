import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageMqttService } from './message-mqtt.service';
import { Server, Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from 'src/auth/jwt/jwtpayload.interface';


@WebSocketGateway({cors: true, namespace: 'mqtt'})

export class MessageMqttGateway {
  
  constructor(private readonly messageMqttService: MessageMqttService, private readonly jwtService : JwtService) {}

  @WebSocketServer() wss: Server;
  private dataBuffer: any[] = [];
  private readonly BUFFER_INTERVAL = 1000;

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JWTPayload;
    try {
      payload = this.jwtService.verify( token );
      await this.messageMqttService.registerClient(client, payload.sub, payload.role);

    } catch (error) {
      client.disconnect();
      return
    }

    // console.log(this.messageWsService.getConnectedClients().map(e => e))
  }

  joinMonitor(client: Socket, payload:any) {

    const token = client.handshake.headers.authorization as string;
    const userPayload = this.jwtService.verify(token);

    const user = this.messageMqttService.getUser(userPayload.sub);

    client.join(`monitor/${user.user.id}`);
  }

  handleDisconnect(client: Socket) {

    console.log('client disconnected');
    
  }

  @SubscribeMessage('health/monitor')
  handleMessage(client: Socket, payload: {BPM: string, SPO2: string} | any) {
  
    if (client.handshake.headers.authorization) {
      const token = client.handshake.headers.authentication as string;
      const userPayload = this.jwtService.verify(token);
      const user = this.messageMqttService.getUser(userPayload.sub);

      this.wss.to(`monitor/${user.user.id}`).emit('monitor', payload);

    } 
    
    console.log(payload.BPM);
    console.log(payload.SPO2);

    // TODO: Guardar en la base de datos
    
    
  }
}
