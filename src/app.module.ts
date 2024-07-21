import { Module } from '@nestjs/common';
import { HospitalModule } from './hospital/hospital.module';
import { AuthModule } from './auth/hospital/auth.module';
import { PrismaService } from './common/db/prisma.service';
import { HospitalRepository } from './hospital/hospital.repository';
import { HospitalService } from './hospital/hospital.service';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { ChatModule } from './chat/chat.module';
import { MessageWsModule } from './message-ws/message-ws.module';
import { MessageMqttModule } from './message-mqtt/message-mqtt.module';
import { MonitorModule } from './monitor/monitor.module';
import { ClinicalRegistryModule } from './clinical-registry/clinical-registry.module';

@Module({
  imports: [
    HospitalModule,
    AuthModule,
    DoctorModule,
    PatientModule,
    ChatModule,
    MessageWsModule,
    MessageMqttModule,
    MonitorModule,
    ClinicalRegistryModule,
  ],
  controllers: [],
  providers: [HospitalService, HospitalRepository, PrismaService],
})
export class AppModule {}
