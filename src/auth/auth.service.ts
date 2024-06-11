import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Bcrypt } from 'src/libs/bcrypt/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly bcrypt: Bcrypt
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findAdmin(email);
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
      const user = await this.userRepository.registerAdmin({...authUserDto, password: hashedPassword })
      return {
        ...user,
        password: undefined
      }
    } catch (error) {
      if (error.code === 'P2002') {
        throw new UnauthorizedException('Email already exists')
      }
    }
  }
}