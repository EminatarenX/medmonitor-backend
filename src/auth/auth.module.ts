import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { PrismaService } from 'src/common/db/prisma.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { Bcrypt } from 'src/libs/bcrypt/bcrypt';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d'}
    })
  ],
  providers: [AuthService, UserService, UserRepository,PrismaService, Bcrypt],
})
export class AuthModule {}
