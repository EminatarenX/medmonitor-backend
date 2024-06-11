import { PrismaService } from "../common/db/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UserRepository {
    constructor(private db: PrismaService) {}

    async create(data: { fullname: string, telephone: string }) {
        return this.db.user.create({ data })
    }

    async registerAdmin(data: { email: string, password: string}){
        return this.db.admin.create({ data })
    }

    async findOne(id: string){
        const user = await this.db.user.findUnique({ where: { id } })
        if(!user) throw new NotFoundException()
        return user
    }

    findAll(){
        return this.db.user.findMany()
    }
    findAdmin(email: string){
        const admin = this.db.admin.findFirst({where: {email}})
        if(!admin) throw new NotFoundException()
        return admin
    }
}