import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { GiftService } from './gift.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('gift')
export class GiftController {
  constructor(private readonly giftService: GiftService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() image: Express.Multer.File , @Body() createGiftDto: CreateGiftDto) {
    return this.giftService.create(image, createGiftDto);
  }

  @Get()
  findAll() {
    return this.giftService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giftService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGiftDto: UpdateGiftDto) {
    return this.giftService.update(+id, updateGiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftService.remove(id);
  }
}
