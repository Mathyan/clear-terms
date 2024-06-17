import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ReviewsService, PrismaService],
})
export class ReviewsModule {}
