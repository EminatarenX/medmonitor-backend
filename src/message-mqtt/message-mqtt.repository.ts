//import { PrismaService } from "src/common/db/prisma.service";
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MessageRepository {
  //constructor(private db : PrismaService) {}

  async savedMessage(data: { payload: string }) {
    //return this.db.message.create({data});
    console.log('saving message...');
  }
}
