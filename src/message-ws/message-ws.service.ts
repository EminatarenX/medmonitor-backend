import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/common/db/prisma.service';

interface ConnectedClients {
  [id: string]: {
    socket: Socket;
    user: any;
  };
}

@Injectable()
export class MessageWsService {
  private connectedClients: ConnectedClients = {};

  constructor(private readonly prismaService: PrismaService) {}

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

    this.checkUserConnection(user);

    this.connectedClients[userId] = {
      socket: client,
      user, 
    };
  }

  getUser(id: string) {
    return this.connectedClients[id]
  }

  getConnectedClients() {
    return Object.values(this.connectedClients).map((client) => client);
  }

  disconnectClient(client: Socket) {
    delete this.connectedClients[client.id];
  }
  getClientBySocketId(socketId: string) {
    return Object.values(this.connectedClients).find(
      (client) => client.socket.id === socketId,
    );
  }

  private checkUserConnection(user: any) {
    for (const clientId of Object.keys(this.connectedClients)) {
        const connectedClients = this.connectedClients[clientId];
        if( connectedClients.user.id === user.id) {
            connectedClients.socket.disconnect();
            break;
        }
    }
  }
}
