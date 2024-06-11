import { Module } from '@nestjs/common';
import { GiftService } from './gift.service';
import { GiftController } from './gift.controller';
import { PrismaService } from 'src/common/db/prisma.service';
import { FileUploader } from 'src/libs/uploader/fileupload.service';
import { GiftRepository } from './gift.repository';
import { UUIDService } from 'src/libs/uuid/uuid.service';


@Module({
  controllers: [GiftController],
  providers: [GiftService, PrismaService, FileUploader, GiftRepository, UUIDService],

})
export class GiftModule {}
