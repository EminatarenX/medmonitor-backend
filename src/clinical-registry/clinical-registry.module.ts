import { Module } from '@nestjs/common';
import { ClinicalRegistryService } from './clinical-registry.service';
import { ClinicalRegistryController } from './clinical-registry.controller';
import { PrismaService } from 'src/common/db/prisma.service';

@Module({
  controllers: [ClinicalRegistryController],
  providers: [ClinicalRegistryService, PrismaService],
})
export class ClinicalRegistryModule {}
