import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientRepository } from './patient.repository';
import { PrismaService } from 'src/common/db/prisma.service';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { CreatePatientHospitalDto } from './dto/create-patient.dto-hospital';

@Injectable()
export class PatientService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly db: PrismaService,
  ) {}
  async create(createPatientDto: CreatePatientDto, doctorId: string) {
    const doctor = await this.db.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) throw new UnauthorizedException();
    const patientId = this.patientRepository.generatePatientId(
      createPatientDto,
      doctorId,
      doctor.hospitalId,
    );
    try {
      await this.patientRepository.create(
        createPatientDto,
        patientId,
        doctor.hospitalId,
        doctorId,
      );
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            `Duplicate field value: ${e.meta.target}`,
          );
        }
        throw new BadRequestException(e.message);
      }
    }
  }

  async findOne(id: string) {
    const patient = await this.patientRepository.findOne(id);
    if (!patient) throw new BadRequestException('Patient not found');
    return patient;
  }

  update(id: string, updatePatientDto: UpdatePatientDto) {
    return this.patientRepository.update(id, updatePatientDto);
  }

  remove(id: string) {
    return `This action removes a #${id} patient`;
  }

  // Create
  async createPatient(
    id: string,
    createPatientHospitalDto: CreatePatientHospitalDto,
  ) {
    const doctor = await this.db.doctor.findUnique({
      where: { id: createPatientHospitalDto.doctorId },
    });
    if (!doctor) throw new UnauthorizedException();

    const patientId = this.patientRepository.generatePatientHospitalId(
      createPatientHospitalDto,
      createPatientHospitalDto.doctorId,
    );

    const newPatient: CreatePatientDto = {
      name: createPatientHospitalDto.name,
      lastName: createPatientHospitalDto.lastName,
      email: createPatientHospitalDto.email,
      birthDate: createPatientHospitalDto.birthDate,
      phone: createPatientHospitalDto.phone,
      address: createPatientHospitalDto.address,
      gender: createPatientHospitalDto.gender,
    };

    try {
      return await this.patientRepository.createByHospital(
        newPatient,
        patientId,
        id,
        createPatientHospitalDto.doctorId,
      );
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            `Duplicate field value: ${e.meta.target}`,
          );
        }
        throw new BadRequestException(e.message);
      }
    }
  }

  
}
