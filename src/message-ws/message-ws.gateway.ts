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
      payload = this.jwtService.verify(token);
      await this.messageWsService.registerClient(
        client,
        payload.sub,
        payload.role,
      );
    } catch (error) {
      client.disconnect();
      return;
    }

    // console.log(this.messageWsService.getConnectedClients().map(e => e))
  }

  handleDisconnect(client: Socket) {
    this.messageWsService.disconnectClient(client);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: MessageDto): void {
    const user = this.messageWsService.getUser(payload.receiverId);
    if (!user) return;
    this.wss.to(user.socket.id).emit('message-server', payload);
  }

  @SubscribeMessage('callUser')
  handleCallUser(
    client: Socket,
    payload: {
      userToCall: string;
      signalData: any;
      from: string;
      name: string;
    },
  ): void {
    const user = this.messageWsService.getUser(payload.userToCall);
    const sender = this.messageWsService.getClientBySocketId(client.id)
    // console.log({sender})
    if (!user) return;
    const dataToSend = {
      signal: payload.signalData,
      // Cambiar sender ID del usuario que llama, no de el usuario encontrado
      // senderId: user.user.id,
      senderId: sender.user.id,
      name: `${payload.from}`,
    };
    this.wss.to(user.socket.id).emit('callUser', dataToSend);
  }

  @SubscribeMessage('answerCall')
  handleAcceptCall(
    client: Socket,
    payload: { signal: any; to: string },
  ): void {
    console.log({to: payload.to})
    const user = this.messageWsService.getUser(payload.to);
    if (!user) return;
    console.log({user})
    this.wss.to(user.socket.id).emit('callAccepted', payload.signal);
  } 
}
