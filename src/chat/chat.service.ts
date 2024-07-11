import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/common/db/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly db: PrismaService) {}
  async create(patientId: string, createChatDto: CreateChatDto) {
    return this.db.chat.create({
      data: {
        doctorId: createChatDto.doctorId,
        patientId: patientId,
      },
    });
  }

  findAll() {
    return `This action returns all chat`;
  }

  async findOne(id: string) {
    const chat = await this.db.chat.findFirst({
      where: {  }
    })
  }

  async findOnePatientChat(patientId: string) {
    const chat = await this.db.chat.findFirst({
      where: { patientId: patientId}
    })
    if(!chat) {
      throw new NotFoundException('El chat no existe')
    }
    const messages = await this.db.message.findMany({
      where: { chatId: chat.id},
      orderBy: { createdAt: 'asc'}
    })

    return {chat, messages }
  }

  async createMessage(from: string, createMessageDto: CreateMessageDto){
    return this.db.message.create({
      data: {
        chatId: createMessageDto.chatId,
        senderId: from,
        receiverId: createMessageDto.to,
        content: createMessageDto.content
      }
    })
  }

  

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
