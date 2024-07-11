import { Module } from '@nestjs/common';
import { HospitalModule } from './hospital/hospital.module';
import { AuthModule } from './auth/hospital/auth.module';
import { PrismaService } from './common/db/prisma.service';
import { HospitalRepository } from './hospital/hospital.repository';
import { HospitalService } from './hospital/hospital.service';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [ HospitalModule, AuthModule, DoctorModule, PatientModule, AppointmentModule, ChatModule],
  controllers: [],
  providers: [HospitalService, HospitalRepository, PrismaService],
})
export class AppModule {}
