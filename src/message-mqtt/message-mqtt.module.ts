import { Module } from '@nestjs/common';
import { MessageMqttService } from './message-mqtt.service';
import { MessageMqttGateway } from './message-mqtt.gateway';
import { MessageRepository } from './message-mqtt.repository';

@Module({
  providers: [MessageMqttGateway, MessageMqttService, MessageRepository],
  exports : [MessageMqttService]
})
export class MessageMqttModule {}
