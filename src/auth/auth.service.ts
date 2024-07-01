import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HospitalService } from '../hospital/hospital.service';
import { JwtService } from '@nestjs/jwt';
import { HospitalRepository } from '../hospital/hospital.repository';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Bcrypt } from 'src/libs/bcrypt/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly hospitalService: HospitalService,
    private readonly jwtService: JwtService,
    private readonly hospitalRepository: HospitalRepository,
    private readonly bcrypt: Bcrypt
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.hospitalService.findAdmin(email);
    if(!user) throw new UnauthorizedException('User not found');
    const isMatch = await this.bcrypt.compare(pass, user.password)
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, user: user.email}
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return  {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async register(authUserDto: CreateAuthDto) {
    try {
      const hashedPassword = await this.bcrypt.hash(authUserDto.password)
      const user = await this.hospitalRepository.registerAdmin({...authUserDto, password: hashedPassword })
      return {
        ...user,
        password: undefined
      }
    } catch (error) {
      this.validateError(error)
    }
  }

  validateError(error: any) {
    if (error.code === 'P2002') {
      throw new UnauthorizedException('Email already exists')
    }else {
      throw new UnauthorizedException(error.message)
    }
  }
}