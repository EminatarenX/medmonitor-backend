import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import { HospitalRepository } from './hospital.repository';
import { PrismaService } from 'src/common/db/prisma.service';

@Module({
  controllers: [HospitalController],
  providers: [HospitalService, HospitalRepository, PrismaService],
  exports: [HospitalService]
})
export class HospitalModule {}
