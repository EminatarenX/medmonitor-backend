import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ClinicalRegistryService } from './clinical-registry.service';
import { ClinicalRegistryDto } from './dto/create-clinical-registry.dto';
import { UpdateClinicalRegistryDto } from './dto/update-clinical-registry.dto';
import { AuthGuard } from 'src/auth/hospital/auth.guard';

@Controller('clinical-registry')
export class ClinicalRegistryController {
  constructor(private readonly clinicalRegistryService: ClinicalRegistryService) {}

  @Post()
  create(@Body() createClinicalRegistryDto: ClinicalRegistryDto) {
    return this.clinicalRegistryService.create(createClinicalRegistryDto);
  }

  @UseGuards(AuthGuard)
  @Get('patient/:id')
  findAllPatientsRegistries(@Request() req, @Param('id') id: string) {
    return this.clinicalRegistryService.findAll( id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicalRegistryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicalRegistryDto: UpdateClinicalRegistryDto) {
    return this.clinicalRegistryService.update(+id, updateClinicalRegistryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicalRegistryService.remove(+id);
  }
}
