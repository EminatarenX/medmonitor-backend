import { Module } from '@nestjs/common';
import { MessageMqttService } from './message-mqtt.service';
import { MessageMqttGateway } from './message-mqtt.gateway';

@Module({
  providers: [MessageMqttGateway, MessageMqttService],
})
export class MessageMqttModule {}
