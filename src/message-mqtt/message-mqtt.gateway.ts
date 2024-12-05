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
  private taskQueue: (() => Promise<void>)[] = [];
  private activeTasks = 0;
  private readonly MAX_CONCURRENT_TASKS = 10;

  constructor(
    private readonly messageMqttService: MessageMqttService,
    private readonly jwtService: JwtService,
  ) {}

  @WebSocketServer() wss: Server;

  private lastSavedTimestamp = 0;
  private lastBPM: string | null = null;
  private lastSPO2: string | null = null;

  /**
   * Manejar la conexión de nuevos clientes
   */
  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;

    try {
      const payload: JWTPayload = this.jwtService.verify(token);
      await this.messageMqttService.registerClient(
        client,
        payload.sub,
        payload.role,
      );
      console.log(`Cliente registrado: ${payload.sub}`);
    } catch (error) {

      // client.disconnect();
    }
  }


  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }


  @SubscribeMessage('health/monitor')
  async handleMessage(
    client: Socket,
    payload: { topic: string; BPM: string; SPO2: string },
  ) {
    // console.log(`Mensaje recibido de ${client.id}:`, payload);

 
    this.taskQueue.push(async () => {
      await this.processTask(payload);
    });

 
    this.processQueue();
  }


  private async processQueue() {
    if (this.activeTasks >= this.MAX_CONCURRENT_TASKS || this.taskQueue.length === 0) {
      return; 
    }

    this.activeTasks++;
    const task = this.taskQueue.shift(); 

    if (task) {
      try {
        await task(); 
      } catch (error) {
        console.error('Error al procesar tarea:', error.message);
      }
    }

    this.activeTasks--;
    this.processQueue(); 
  }


  private async processTask(payload: { topic: string; BPM: string; SPO2: string }): Promise<void> {
    const currentTimestamp = Date.now();
    const interval = 3000; // 3 segundos

    const bpmChanged = payload.BPM !== this.lastBPM;
    const spo2Changed = payload.SPO2 !== this.lastSPO2;

    if (currentTimestamp - this.lastSavedTimestamp >= interval && (bpmChanged || spo2Changed)) {
      await this.messageMqttService.saveSensorData(payload.topic, +payload.BPM, +payload.SPO2);
      this.lastSavedTimestamp = currentTimestamp;
      this.lastBPM = payload.BPM;
      this.lastSPO2 = payload.SPO2;
      console.log('Datos guardados:', payload);
    }
  }
}
