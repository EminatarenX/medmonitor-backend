import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PrismaService } from 'src/common/db/prisma.service';
import { PatientRepository } from './patient.repository';

@Module({
  controllers: [PatientController],
  providers: [PatientService, PrismaService, PatientRepository],
  exports: [PatientService]
})
export class PatientModule {}
