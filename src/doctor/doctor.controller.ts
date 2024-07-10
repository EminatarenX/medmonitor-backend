import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard } from 'src/auth/hospital/auth.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto, req.user.sub);
  }
  @UseGuards(AuthGuard)
  @Get('patients')
  findAllPatients(@Request() req, @Query() paginationDto: PaginationDto) {
    return this.doctorService.findAllPatients(req.user.sub, paginationDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req, @Query() paginationDto: PaginationDto) {
    return this.doctorService.findAll(req.user.sub, paginationDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
}
