import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './auth.guard';
import { PatientAuthDto } from './dto/patient-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  sighIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto.email, createAuthDto.password);
  }

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('doctor/login')
  doctorLogin(@Body() createAuthDto: CreateAuthDto){
    return this.authService.doctorLogin(createAuthDto.email, createAuthDto.password)
  }

  @Post('patient/login')
  patientLogin(@Body() patientAuthDto: PatientAuthDto){
    return this.authService.patientLogin(patientAuthDto.id)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.profile(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('doctor/profile')
  getDoctorProfile(@Request() req) {
    return this.authService.doctorProfile(req.user.sub)
  }

  @UseGuards(AuthGuard)
  @Get('patient/profile')
  getPatientProfile(@Request() req) {
    return this.authService.patientProfile(req.user.sub)
  }
  
}
