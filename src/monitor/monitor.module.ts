import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { PrismaService } from 'src/common/db/prisma.service';

@Module({
  controllers: [MonitorController],
  providers: [MonitorService, PrismaService],
})
export class MonitorModule {}
