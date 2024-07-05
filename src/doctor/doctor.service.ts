import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/common/db/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Bcrypt } from 'src/libs/bcrypt/bcrypt';

@Injectable()
export class DoctorService {
  constructor(
    private readonly dbService: PrismaService,
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

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }

  handleErrors (error: any) {
    if(error.code === ''){

    }else {

    }
  }
}
