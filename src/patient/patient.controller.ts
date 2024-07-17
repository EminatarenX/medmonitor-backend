import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreatePatientHospitalDto } from './dto/create-patient.dto-hospital';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AuthGuard } from 'src/auth/hospital/auth.guard';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(AuthGuard)
  @Post('')
  create(@Request() req ,@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  createPatient(@Request() req ,@Body() createPatientHospitalDto: CreatePatientHospitalDto) {
    return this.patientService.createPatient(createPatientHospitalDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
