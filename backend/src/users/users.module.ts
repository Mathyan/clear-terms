import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { Crypt } from 'src/crypt/crypt';

@Module({
  providers: [UsersService, PrismaService, Crypt],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
