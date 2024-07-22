import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/common/db/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Bcrypt } from 'src/libs/bcrypt/bcrypt';
import { PatientRepository } from 'src/patient/patient.repository';

@Injectable()
export class DoctorService {
  constructor(
    private readonly dbService: PrismaService,
    private readonly patientRepository: PatientRepository,
    private readonly hashService: Bcrypt
  ){}
  async create(createDoctorDto: CreateDoctorDto, hospitalId: string) {

    const exist = await this.findByEmail(createDoctorDto.email)
    if(exist) throw new BadRequestException('El correo ya ha sido registrado')
    const existPhone = await this.dbService.doctor.findUnique({where: {phone: createDoctorDto.phone}})
    if(existPhone) throw new BadRequestException('El teléfono ya ha sido registrado')
    createDoctorDto.password = await this.hashService.hash(createDoctorDto.password)
    const doctor = await this.dbService.doctor.create({
      data: {...createDoctorDto, hospitalId: hospitalId}
    })
    return doctor
  }

  async findAll(hospitalId: string, {offset, limit}: PaginationDto) {
    const total = await this.dbService.doctor.count({where: {hospitalId}})
    const doctors = await this.dbService.doctor.findMany({
      where: {hospitalId},
      skip: (offset - 1) * limit,
      take: limit,
      orderBy: {createdAt: 'desc'}
    })
    return {total, doctors}
  }

  async findOne(id: string) {
    const doctor = await this.dbService.doctor.findUnique({
      where: { id }
    })

    if(!doctor) return null
    return doctor
  }

  async findByEmail(email: string) {
    return await this.dbService.doctor.findUnique({
      where: { email }
    })
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    const exist = this.findOne(id)
    if(!exist) throw new BadRequestException('El doctor no existe')
    updateDoctorDto.password = await this.hashService.hash(updateDoctorDto.password)
    return await this.dbService.doctor.update({
      where: {id},
      data: updateDoctorDto
    })
  }

  async remove(id: string) {
    const doctor = await this.findOne(id)
    if(!doctor) throw new BadRequestException('El doctor no existe')
    await this.dbService.doctor.delete({where: {id}})
    return

  }

  findAllPatients(id: string, pagintationDto: PaginationDto) {
    return this.patientRepository.findAllByDoctorId(id, pagintationDto.limit, pagintationDto.offset)
  }

  async getMessagesStatistics(id: string) {
    
    const chats = await this.dbService.chat.findMany({where: {doctorId: id}, include: {messages: true}})
    let messages = 0
    chats.forEach(chat => {
        chat.messages.forEach( message => {
          if(message.senderId === id){
            messages++
          }
          if(message.receiverId === id) {
            messages++
          }
        })
    });
    return messages
  }

  handleErrors (error: any) {
    if(error.code === ''){

    }else {

    }
  }
}
