import { Module } from '@nestjs/common';
import { MessageMqttService } from './message-mqtt.service';
import { MessageMqttGateway } from './message-mqtt.gateway';
import { MessageRepository } from './message-mqtt.repository';
import { PrismaService } from 'src/common/db/prisma.service';
import { MonitorService } from 'src/monitor/monitor.service';

@Module({
  providers: [MessageMqttGateway, MessageMqttService, MessageRepository, PrismaService, MonitorService],
  exports : [MessageMqttService]
})
export class MessageMqttModule {}
