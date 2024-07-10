import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { PrismaService } from 'src/common/db/prisma.service';
import { Bcrypt } from 'src/libs/bcrypt/bcrypt';
import { PatientRepository } from 'src/patient/patient.repository';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, PrismaService, Bcrypt, PatientRepository],
})
export class DoctorModule {}
