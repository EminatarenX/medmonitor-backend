import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageWsService } from './message-ws.service';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from 'src/auth/jwt/jwtpayload.interface';
import { MessageDto } from './dtos/message.dto';

@WebSocketGateway({ cors: true })
export class MessageWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messageWsService: MessageWsService,
    private readonly jwtService: JwtService,
  ) {}

  @WebSocketServer() wss: Server;

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JWTPayload;
    try {
      payload = this.jwtService.verify( token );
      await this.messageWsService.registerClient(client, payload.sub, payload.role);

    } catch (error) {
      client.disconnect();
      return
    }

    // console.log(this.messageWsService.getConnectedClients().map(e => e))
  }

  handleDisconnect(client: Socket) {
    this.messageWsService.disconnectClient(client)

  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: MessageDto): void {
    const user = this.messageWsService.getUser(payload.receiverId);
    if(!user) return;
    this.wss.to(user.socket.id).emit('message-server', payload)
  }

  @SubscribeMessage('callUser')
  handleCallUser(client: Socket, payload: {
    userToCall: string,
    signalData: any,
    from: string,
    name: string,
}): void {
    const user = this.messageWsService.getUser(payload.userToCall);
    if(!user) return;
    const dataToSend = { signal: payload.signalData, senderId: payload.from, name: `${user.user.name} ${user.user.lastName}` }
    this.wss.to(user.socket.id).emit('callUser', dataToSend)
  } 
  
  @SubscribeMessage('answerCall')
  handleAccceptCall(client: Socket, payload: {signal: any, to: string}): void {
    const user = this.messageWsService.getUser(payload.to); 
    if(!user) return; 
    console.log('answerCall', payload)
    this.wss.to(user.socket.id).emit('callAccepted', payload.signal)
  }
}
