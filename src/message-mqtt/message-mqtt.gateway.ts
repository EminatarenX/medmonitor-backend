import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageMqttService } from './message-mqtt.service';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from 'src/auth/jwt/jwtpayload.interface';

@WebSocketGateway({ cors: true, namespace: 'mqtt' })
export class MessageMqttGateway {
  constructor(
    private readonly messageMqttService: MessageMqttService,
    private readonly jwtService: JwtService,
  ) {}

  @WebSocketServer() wss: Server;
  private dataBuffer: any[] = [];
  private readonly BUFFER_INTERVAL = 1000;
  private lastSavedTimestamp = 0;
  private lastBPM: string | null = null;
  private lastSPO2: string | null = null;

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JWTPayload;
    try {
      payload = this.jwtService.verify(token);
      await this.messageMqttService.registerClient(
        client,
        payload.sub,
        payload.role,
      );
    } catch (error) {
      // client.disconnect();
      return;
    }

    // console.log(this.messageWsService.getConnectedClients().map(e => e))
  }

  handleDisconnect(client: Socket) {
    this.handleConnection(client);
  }

  @SubscribeMessage('health/monitor')
  async handleMessage(
    client: Socket,
    payload: { topic: string; BPM: string; SPO2: string } | any,
  ) {
    const currentTimestamp = Date.now();
    const interval = 3000; // 3 seconds



    const bpmChanged = payload.BPM !== this.lastBPM;
    const spo2Changed = payload.SPO2 !== this.lastSPO2;

    if ((currentTimestamp - this.lastSavedTimestamp >= interval) && (bpmChanged || spo2Changed)) {
      this.messageMqttService.saveSensorData(payload.topic, +payload.BPM, +payload.SPO2);
      this.lastSavedTimestamp = currentTimestamp;
      this.lastBPM = payload.BPM;
      this.lastSPO2 = payload.SPO2;
    }
  }
}
