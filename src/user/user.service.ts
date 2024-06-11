import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ){}


  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto)
  }

  async findAdmin(email: string){
    return await this.userRepository.findAdmin(email)
  }

  async findAll() {
    return await this.userRepository.findAll()
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
