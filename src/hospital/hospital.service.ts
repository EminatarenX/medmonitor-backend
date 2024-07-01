import { Injectable } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { HospitalRepository } from './hospital.repository';

@Injectable()
export class HospitalService {
  constructor(
    private readonly hospitalRepository: HospitalRepository
  ){}


  async create(createHospitalDto: CreateHospitalDto) {
    return await this.hospitalRepository.create(createHospitalDto)
  }

  async findAdmin(email: string){
    return await this.hospitalRepository.findAdmin(email)
  }

  async findAll() {
    return await this.hospitalRepository.findAll()
  }

  async findOne(id: string) {
    return await this.hospitalRepository.findOne(id)
  }

  update(id: number, updateHospitalDto: UpdateHospitalDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
