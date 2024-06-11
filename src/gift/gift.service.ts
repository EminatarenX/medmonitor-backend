import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { GiftRepository } from './gift.repository';
import { FileUploader } from '../libs/uploader/fileupload.service';
import { UUIDService } from '../libs/uuid/uuid.service';

@Injectable()
export class GiftService {
  constructor(
    private readonly giftRepository: GiftRepository,
    private readonly uploader: FileUploader,
    private readonly uuidRepository: UUIDService
  ){}

  async create(image: Express.Multer.File ,createGiftDto: CreateGiftDto) {
    const key = this.uuidRepository.generate() + '.png'
    await this.uploader.save(image, key)
    const gift = await this.giftRepository.create(createGiftDto.name, createGiftDto.urls,key)
    const signedurl = await this.uploader.getSignedUrl(key)
    return { ...gift, signedurl }
  }

  async findAll() {
    let gifts = await this.giftRepository.findAll()

    const giftPromises = gifts.map(async (gift) => {
      gift.image = await this.uploader.getSignedUrl(gift.image);
      return gift;
    });
    
    return await Promise.all(giftPromises);
  }

  async findOne(id: string) {
    const gift = await this.giftRepository.findOne(id)
    if(!gift){
      throw new NotFoundException()
    }
    gift.image = await this.uploader.getSignedUrl(gift.image)
    return gift
  }

  update(id: number, updateGiftDto: UpdateGiftDto) {
    return `This action updates a #${id} gift`;
  }

  async remove(id: string) {
    const gift = await this.giftRepository.findOne(id)
    if(!gift){
      throw new NotFoundException()
    }
    await this.giftRepository.remove(id)
    await this.uploader.delete(gift.image)
    return {
      message: 'Gift deleted successfully'
    }
  }
}
