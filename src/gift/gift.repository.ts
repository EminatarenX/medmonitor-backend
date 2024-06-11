import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/db/prisma.service';

@Injectable()
export class GiftRepository {
  constructor(private readonly db: PrismaService) {}

  async create(name: string,urls: String[], image: string) {
    return await this.db.gift.create({
      data: {
        name,
        image,
        urls: JSON.stringify(urls),
        available: true,
      },
    });
  }

  async findAll(){
    const regalos = await this.db.gift.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return regalos.map( regalo => ({
      ...regalo,
      urls: JSON.parse(regalo.urls)
    }))
  }

  async findOne(id: string){
    return await this.db.gift.findUnique({
      where: { id }
    })
  }

  async remove(id: string){
     await this.db.gift.delete({
      where: { id }
    })
  }
}
