import { PrismaService } from "../common/db/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class HospitalRepository {

    constructor(private db: PrismaService) {}

    async create(data: { email: string, password: string}) {
        return this.db.hospital.create({ data })    
    }

    async registerAdmin(data: { email: string, password: string}){
        return this.db.hospital.create({ data })
    }

    async findOne(id: string){
        const user = await this.db.hospital.findUnique({ where: { id } })
        if(!user) throw new NotFoundException()
        return user
    }

    findAll(){
        return this.db.hospital.findMany()
    }
    findAdmin(email: string){
        const admin = this.db.hospital.findFirst({where: {email}})
        if(!admin) throw new NotFoundException()
        return admin
    }
}