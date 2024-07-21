import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/db/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { CreatePatientHospitalDto } from './dto/create-patient.dto-hospital';

@Injectable()
export class PatientRepository {
  constructor(private readonly db: PrismaService) {}

  generatePatientId(
    createPatientDto: CreatePatientDto,
    doctorId: string,
    hospitalId: string,
  ){
    
    const patientName = createPatientDto.name.split(' ');
    const patientLastName = createPatientDto.lastName.split(' ');
    const patientNameState = patientName[0];
    const patientLastNameState = patientLastName[0];
    const nameCode =
      patientNameState.split('')[0].toUpperCase() +
      patientNameState.split('')[1].toUpperCase() +
      patientNameState.split('')[2].toUpperCase();
    const lastNameCode =
      patientLastNameState.split('')[0].toUpperCase() +
      patientLastNameState.split('')[1].toUpperCase() +
      patientLastNameState.split('')[2].toUpperCase();
    const birthDate = createPatientDto.birthDate.toISOString();
    const random = () => Math.floor(Math.random() * 1000);
    const randomIdLetter = () => Math.floor(Math.random() * 32);

    const randomString = () =>
    Math.random().toString(36).substring(3).toUpperCase().substring(8);
    const hospitalIdString = hospitalId.replace(/-/g, '');
    const doctorIdString = doctorId.replace(/-/g, '');
    const hospitalCode =
      hospitalIdString.split('')[randomIdLetter()].toUpperCase() +
      hospitalIdString.split('')[randomIdLetter()].toUpperCase() +
      hospitalIdString.split('')[randomIdLetter()].toUpperCase();
    const doctorCode =
      doctorIdString.split('')[randomIdLetter()].toUpperCase() +
      doctorIdString.split('')[randomIdLetter()].toUpperCase() +
      doctorIdString.split('')[randomIdLetter()].toUpperCase();
    const birthArray = [
      `${randomString()}`,
      `${birthDate.split('-')[1]}`,
      `${birthDate.split('-')[2].split('T')[0]}`,
    ];
    const birthCode = this.randomFromArray(birthArray);
    const patientId = `${nameCode}${birthCode}-${lastNameCode}${hospitalCode}-${doctorCode}${random()}`;
    return patientId;
  }

  generatePatientHospitalId(
    createPatientHospitalDto: CreatePatientHospitalDto,
    doctorId: string,
    //hospitalId: string,
  ){
    
    const patientName = createPatientHospitalDto.name.split(' ');
    const patientLastName = createPatientHospitalDto.lastName.split(' ');
    const patientNameState = patientName[0];
    const patientLastNameState = patientLastName[0];
    const nameCode =
      patientNameState.split('')[0].toUpperCase() +
      patientNameState.split('')[1].toUpperCase() +
      patientNameState.split('')[2].toUpperCase();
    const lastNameCode =
      patientLastNameState.split('')[0].toUpperCase() +
      patientLastNameState.split('')[1].toUpperCase() +
      patientLastNameState.split('')[2].toUpperCase();
    const birthDate = createPatientHospitalDto.birthDate.toISOString();
    const random = () => Math.floor(Math.random() * 1000);
    const randomIdLetter = () => Math.floor(Math.random() * 32);

    const randomString = () =>
    Math.random().toString(36).substring(3).toUpperCase().substring(8);
    //const hospitalIdString = hospitalId.replace(/-/g, '');
    const doctorIdString = doctorId.replace(/-/g, '');
    //const hospitalCode =
      //hospitalIdString.split('')[randomIdLetter()].toUpperCase() +
      //hospitalIdString.split('')[randomIdLetter()].toUpperCase() +
      //hospitalIdString.split('')[randomIdLetter()].toUpperCase();
    const doctorCode =
      doctorIdString.split('')[randomIdLetter()].toUpperCase() +
      doctorIdString.split('')[randomIdLetter()].toUpperCase() +
      doctorIdString.split('')[randomIdLetter()].toUpperCase();
    const birthArray = [
      `${randomString()}`,
      `${birthDate.split('-')[1]}`,
      `${birthDate.split('-')[2].split('T')[0]}`,
    ];
    const birthCode = this.randomFromArray(birthArray);
    const patientId = `${nameCode}${birthCode}-${lastNameCode}-${doctorCode}${random()}`;
    return patientId;
  }

  randomFromArray(array: string[]) {
    let stringcode = '';
    for (let i = 0; i < array.length; i++) {
      const random = Math.floor(Math.random() * 3);
      stringcode += array[random];
    }
    return stringcode;
  }

  async create(
    data: CreatePatientDto,
    id: string,
    hospitalId: string,
    doctorId: string,
  ) {
    return this.db.patient.create({
      data: {
        ...data,
        id,
        hospital: { connect: { id: hospitalId } },
        doctor: { connect: { id: doctorId } },
      },
    });
  }

  async createByHospital(
    data: CreatePatientDto,
    id: string,
    hospitalId: string,
    doctorId: string,
  ) {
    return this.db.patient.create({
      data: {
        ...data,
        id,
        hospitalId: hospitalId,
        doctorId: doctorId,
      },
    });
  }


  async findOne(id: string) {
    return this.db.patient.findUnique({ where: { id } });
  }
  async findAll() {
    return this.db.patient.findMany();
  }

  async findAllByDoctorId(doctorId: string, limit: number, offset: number) {
    const total = await this.db.patient.count({ where: { doctorId } });
    const patients = await this.db.patient.findMany({ 
      where: { doctorId },
      skip: (offset - 1) * limit,
      take: limit,
    });
    return { total, patients };
  }
  async update(id: string, data: UpdatePatientDto) {

    return this.db.patient.update({
      where : { id },
      data : data
    })

  }

  async remove(id: string) {

    return this.db.patient.delete({ where : { id }});
  }
}

