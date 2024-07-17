import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { HospitalService } from '../../hospital/hospital.service';
import { JwtService } from '@nestjs/jwt';
import { HospitalRepository } from '../../hospital/hospital.repository';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Bcrypt } from 'src/libs/bcrypt/bcrypt';
import { PrismaService } from 'src/common/db/prisma.service';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly hospitalService: HospitalService,
    private readonly db: PrismaService,
    private readonly jwtService: JwtService,
    private readonly hospitalRepository: HospitalRepository,
    private readonly bcrypt: Bcrypt
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.hospitalService.findAdmin(email);
    if(!user) throw new UnauthorizedException('El correo electrónico no está registrado');
    const isMatch = await this.bcrypt.compare(pass, user.password)
    if (!isMatch) {
      throw new UnauthorizedException('El correo electrónico o la contraseña son incorrectos');
    }
    const payload = { role: 'hospital', sub: user.id, user: user.email}
    return  {
      user: {...user, password: undefined},
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

  async profile(id: string) {
    const user = await this.hospitalRepository.findAdmin(id)
    return {
      user: {...user, password: undefined},
      access_token: await this.jwtService.signAsync({role: 'hospital', sub: user.id, user: user.email})
    }

  }

  async doctorProfile(id: string) {
    const user = await this.db.doctor.findUnique({where: {id}})
    return {
      user: {...user, password: undefined},
      access_token: await this.jwtService.signAsync({ role: user.role, sub: user.id, user: user.email})
    }
  }

  async doctorLogin(email: string, pass: string) {
    const user = await this.db.doctor.findUnique({where: {email}});
    if(!user) throw new UnauthorizedException('El correo electrónico no está registrado');
    const isMatch = await this.bcrypt.compare(pass, user.password)
    if (!isMatch) {
      throw new UnauthorizedException('El correo electrónico o la contraseña son incorrectos');
    }

    const payload = { role: user.role, sub: user.id, user: user.email}
    const token = await this.jwtService.signAsync(payload)
    
    return  {
      user: {...user, password: undefined},
      access_token: token
    }
  }

  async patientLogin(id: string) {
    const user = await this.db.patient.findUnique({where: {id}})
    if(!user) throw new UnauthorizedException('El paciente no está registrado');
    const payload = { role: user.role, sub: user.id, user: user.id}
    const token = await this.jwtService.signAsync(payload)
    return {
      user: {...user, password: undefined},
      access_token: token
    }
  }

  async patientProfile(id: string) {
    const user = await this.db.patient.findUnique({where: {id}})
    return {
      user: {...user, password: undefined},
      access_token: await this.jwtService.signAsync({ role: user.role, sub: user.id, user: user.id})
    }
  }

  validateError(error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestException('El correo electrónico ya ha sido registrado')
    }else {
      throw new UnauthorizedException(error.message)
    }
  }
}