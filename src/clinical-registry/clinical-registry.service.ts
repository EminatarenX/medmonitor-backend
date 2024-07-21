import { Injectable, NotFoundException } from '@nestjs/common';
import { ClinicalRegistryDto } from './dto/create-clinical-registry.dto';
import { UpdateClinicalRegistryDto } from './dto/update-clinical-registry.dto';
import { PrismaService } from 'src/common/db/prisma.service';

@Injectable()
export class ClinicalRegistryService {
  constructor (private readonly db: PrismaService) {}
  async create(createClinicalRegistryDto: ClinicalRegistryDto) {  
    const { patientId, background, diagnoses, treatments, medications, allergies, observations, declaration } = createClinicalRegistryDto;
    const patient = await this.db.patient.findUnique({ where: { id: patientId}});
    if (!patient) throw new NotFoundException();
      return await this.db.medicalHistory.create({
      data: {
        patientId: patientId,
        doctorId: patient.doctorId,
        hospitalId: patient.hospitalId,
        background: {
          create: background.map(item => ({ content: item.content }))
        }, 
        diagnoses: {
          create: diagnoses.map(item => ({ content: item.content }))
        },
        treatments: {
          create: treatments.map(item => ({ content: item.content }))
        },
        medications: {
          create: medications.map(item => ({ content: item.content }))
        },
        allergies: {
          create: allergies.map(item => ({ content: item.content }))
        },
        observations: {
          create: observations.map(item => ({ content: item.content }))
        },
        declaration: {
          create: {
            content: declaration.content,
            signature: declaration.signature
          }
        }
      }
    });

  }

  async findAll(patientId: string) {

    const total = await this.db.medicalHistory.count({ where: { patientId }});
    const registries = await this.db.medicalHistory.findMany({
      where: { patientId },
      include: {
        background: true,
        diagnoses: true,
        treatments: true,
        medications: true,
        allergies: true,
        observations: true,
        declaration: true
      },
      orderBy: { createdAt: 'desc'}
    })
    return {
      total,
      registries
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} clinicalRegistry`;
  }

  update(id: number, updateClinicalRegistryDto: UpdateClinicalRegistryDto) {
    return `This action updates a #${id} clinicalRegistry`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalRegistry`;
  }
}
