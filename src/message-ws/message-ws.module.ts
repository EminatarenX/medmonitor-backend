import { Module } from '@nestjs/common';
import { MessageWsService } from './message-ws.service';
import { MessageWsGateway } from './message-ws.gateway';
import { PrismaService } from 'src/common/db/prisma.service';

@Module({
  providers: [MessageWsGateway, MessageWsService, PrismaService],
})
export class MessageWsModule {}
