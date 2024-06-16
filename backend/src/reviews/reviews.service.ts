import { Injectable } from '@nestjs/common';
import { Prisma, ServiceReview } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prism: PrismaService) {}
  async getReview(
    reviewWhereUniqueImput: Prisma.ServiceReviewWhereUniqueInput,
  ): Promise<ServiceReview | null> {
    return await this.prism.serviceReview.findUnique({
      where: reviewWhereUniqueImput,
    });
  }
}
