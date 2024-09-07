import { Injectable } from '@nestjs/common';
import { Prisma, ServiceReview } from '@prisma/client';
import { CreateReviewSchemaDto } from 'src/dto/create-review.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
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

  async deleteReview(id: number): Promise<ServiceReview | null> {
    return this.prism.serviceReview.delete({ where: { id: id } });
    // .catch(() => {
    //   throw new Error('Review not found');
    // });
  }

  async getReviews(
    paginationDto: PaginationDto,
  ): Promise<ServiceReview[] | null> {
    if (
      !paginationDto.cursor &&
      !paginationDto.orderBy &&
      !paginationDto.skip &&
      !paginationDto.take &&
      !paginationDto.where
    ) {
      return this.prism.serviceReview.findMany();
    }

    const parms: any = {
      skip: paginationDto.skip,
      take: paginationDto.take,
      where: null,
      orderBy: null,
    };
    if (paginationDto.cursor) {
      parms.cursor = {
        id: paginationDto.cursor,
      };
      parms.skip = 1;
    }
    try {
      parms.where = JSON.parse(paginationDto.where);
    } catch (e) {
      parms.where = {};
    }
    try {
      parms.orderBy = JSON.parse(paginationDto.orderBy);
    } catch (e) {
      if (parms.where && Object.keys(parms.where).length > 0) {
        const cursorKeySetTo = Object.keys(parms.where)[0];
        parms.orderBy = {
          [cursorKeySetTo]: 'asc',
        };
      } else {
        parms.orderBy = {
          id: 'asc',
        };
      }
    }
    console.log('Parms: ', parms);

    return this.prism.serviceReview.findMany(parms);
  }

  async createReview(
    userId: number,
    createReviewDto: CreateReviewSchemaDto,
  ): Promise<ServiceReview> {
    if (!userId) {
      throw new Error('User not found');
    }
    const data = {
      userId,
      title: createReviewDto.title,
      content: createReviewDto.content,
    };
    return this.prism.serviceReview.create({ data });
  }
}
