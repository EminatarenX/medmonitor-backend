import { Module } from '@nestjs/common';
import { GiftModule } from './gift/gift.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Bcrypt } from './libs/bcrypt/bcrypt';
import { PrismaService } from './common/db/prisma.service';
import { UserRepository } from './user/user.repository';
import { UserService } from './user/user.service';


@Module({
  imports: [GiftModule, UserModule, AuthModule],
  controllers: [],
  providers: [UserService, UserRepository, PrismaService],
})
export class AppModule {}
