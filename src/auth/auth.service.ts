import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    if(!user) throw new UnauthorizedException('El correo electrónico no está registrado');
    const isMatch = await this.bcrypt.compare(pass, user.password)
    if (!isMatch) {
      throw new UnauthorizedException('El correo electrónico o la contraseña son incorrectos');
    }
    const payload = { sub: user.id, user: user.email}
    return  {
      user: {...user, password: undefined},
      access_token: await this.jwtService.signAsync(payload, { expiresIn: '30m'})
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
      access_token: await this.jwtService.signAsync({ sub: user.id, user: user.email})
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