import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { PrismaService } from 'src/prisma.service';
import { ReviewsController } from './reviews.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [ReviewsService, PrismaService, UsersService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
