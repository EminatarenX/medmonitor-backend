import { PartialType } from '@nestjs/swagger';
import { ClinicalRegistryDto } from './create-clinical-registry.dto';

export class UpdateClinicalRegistryDto extends PartialType(ClinicalRegistryDto) {}
