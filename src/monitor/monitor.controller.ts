import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { AuthGuard } from 'src/auth/hospital/auth.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}


  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createMonitorDto: CreateMonitorDto) {
    return this.monitorService.create(req.user.sub, createMonitorDto);
  }

  @UseGuards(AuthGuard)
  @Get('hospital')
  findAllByHospital( @ Request() req, @Query() paginationDto: PaginationDto ) {
    return this.monitorService.findAllByHospital(req.user.sub, paginationDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllByDoctor(@Request() req, @Query() paginationDto: PaginationDto ) {
    return this.monitorService.findAllByDoctor(req.user.sub, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonitorDto: UpdateMonitorDto) {
    return this.monitorService.update(id, updateMonitorDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.monitorService.remove(req.user.sub, id);
  }

  @Post('test/data')
  fillData(@Body() data: {BPM: string, SPO2: string, monitorId: string}) {
    return this.monitorService.registerMonitorData(data.monitorId, {BPM: data.BPM, SPO2: data.SPO2});
  }
}
