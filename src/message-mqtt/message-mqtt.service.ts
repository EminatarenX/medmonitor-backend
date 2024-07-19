import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';
import { MessageRepository } from './message-mqtt.repository';
import { PrismaService } from 'src/common/db/prisma.service';

interface clients {
    [id: string]: {
      socket: Socket;
      user: any;
    };
  }
  
@Injectable()
export class MessageMqttService {

    private connectedClients: clients = {};

    constructor(private readonly prismaService : PrismaService) {}
    
    async savedMessage(payload:any) {

      

    }

    getUser(id: string) {
      return this.connectedClients[id]
    }

    async registerClient(client: Socket, userId: string, role: string) {
      let user: any;
      switch (role) {
        case 'hospital':
          const hospital = await this.prismaService.hospital.findUnique({
            where: { id: userId },
          });
          user = hospital;
          break;
        case 'doctor':
          const doctor = await this.prismaService.doctor.findUnique({
            where: { id: userId },
          });
          user = doctor;
          break;
        case 'patient':
          const patient = await this.prismaService.patient.findUnique({
            where: { id: userId },
          });
          user = patient;
          break;
        default:
          client.disconnect();
          break;
      }
}
}