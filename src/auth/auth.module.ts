import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HospitalService } from 'src/hospital/hospital.service';
import { HospitalRepository } from 'src/hospital/hospital.repository';
import { PrismaService } from 'src/common/db/prisma.service';
import { HospitalModule } from 'src/hospital/hospital.module';
import { JwtModule } from '@nestjs/jwt';
import { Bcrypt } from 'src/libs/bcrypt/bcrypt';

@Module({
  controllers: [AuthController],
  imports: [
    HospitalModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d'}
    })
  ],
  providers: [AuthService, HospitalService, HospitalRepository,PrismaService, Bcrypt],
})
export class AuthModule {}
