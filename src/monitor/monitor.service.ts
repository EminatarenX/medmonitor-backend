import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { PrismaService } from 'src/common/db/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MonitorService {
  constructor(
    private readonly db: PrismaService,
  ) {}
  async create(doctorId: string, createMonitorDto: CreateMonitorDto) {
    const doctor = await this.db.doctor.findUnique({ where: { id: doctorId}})
    if (!doctor) throw new UnauthorizedException();
    const monitorExist = await this.db.monitor.findFirst({ where: { patientId: createMonitorDto.patientId}})
    if (monitorExist) throw new UnauthorizedException('Monitor already exist');

    return this.db.monitor.create({
      data: {
        channel: createMonitorDto.channel,
        patient: { connect: {id: createMonitorDto.patientId}},
        doctor: { connect: {id: doctorId}},
        hospital: { connect: {id: doctor.hospitalId}}, 
      },
      include: {
        patient: true,
      }
    })

    
  } 

  async findAllByHospital(hospitalId: string, {limit, offset}: PaginationDto) {
    const total = await this.db.monitor.count({ where: { hospitalId: hospitalId}})
    const monitors = await this.db.monitor.findMany({
      where: { hospitalId: hospitalId},
      skip: (offset - 1) * limit,
      take: limit,
      include: {
        patient: true,
        monitor_data: {
          orderBy: {createdAt: 'desc'},
          take: 6
        }
      }
    })
    return {
      total,
      monitors
    }
  }

  async findAllByDoctor(doctorId: string, {limit, offset}: PaginationDto) {
    const total = await this.db.monitor.count({ where: { doctorId: doctorId}})
    const monitors = await this.db.monitor.findMany({
      where: { doctorId: doctorId},
      skip: (offset - 1) * limit,
      take: limit,
      include: {
        patient: true,
        monitor_data: {
          orderBy: {createdAt: 'desc'},
          take: 6
        }
      }
    }) 
  


    return {
      total,
      monitors
    }
  }

  findOne(id: string) {
    return this.db.monitor.findFirst({ 
      where: { patientId: id },
      include: {
        patient: true,
        monitor_data: {
          orderBy: {createdAt: 'desc'},
          take: 6
        }
      }
    })
  }

  async update(id: string, updateMonitorDto: UpdateMonitorDto) {
    const updatedMonitor = await this.db.monitor.update({ 
      where: { id },
      data: updateMonitorDto,
      include: {
        patient: true,
        monitor_data: {
          take: 10
        }
      }
    })

    return updatedMonitor; 
    
  }

  async remove(doctorId: string, id: string) {
    const monitor = await this.db.monitor.findUnique({ where: { id }})
    if(monitor.doctorId !== doctorId) throw new UnauthorizedException('Tu no eres el doctor de este monitor');
    await this.db.monitor.delete({ where: {id }})
    return {
      message: 'Monitor eliminado',
      status: 200,
    }

  }

  async registerMonitorData(monitorId: string, payload: {BPM: string, SPO2: string}) {
    const monitor = await this.db.monitor.findUnique({ where: { id: monitorId}})
    if (!monitor) return;
    return this.db.monitorData.create({
      data: {
        monitor: { connect: {id: monitorId}},
        bpm: +payload.BPM,
        spo2:+payload.SPO2
      }
    })
    
  }

  async registerMonitorDataByTopic(topic: string, payload: {BPM: number, SPO2: number}) {
    const monitor = await this.db.monitor.findFirst({ where: { channel: topic}})
    if (!monitor) return;
      return this.db.monitorData.create({
      data: {
        monitor: { connect: {id: monitor.id}},
        bpm: payload.BPM,
        spo2:payload.SPO2
      }
    })
  }
}
