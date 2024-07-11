import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { AuthGuard } from 'src/auth/hospital/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createChatDto: CreateChatDto) {
    return this.chatService.create(req.user.sub, createChatDto);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }
  @Get('patient/:id')
  findOnePatientChat(@Param('id') id: string) {
    return this.chatService.findOnePatientChat(id);
  }

  @UseGuards(AuthGuard)
  @Post('message')
  createMessage(@Request() req, @Body() createMessageDto: CreateMessageDto) {
    const from = req.user.sub
    return this.chatService.createMessage(from,createMessageDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
