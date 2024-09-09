import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Public } from 'src/public-metadata/public-metadata.decorator';
import { UsersService } from 'src/users/users.service';
import { ZodValidationPipe } from 'src/zod.validation.pipe';
import {
  CreateReviewSchema,
  CreateReviewSchemaDto,
} from 'src/dto/create-review.dto';
import { Role } from 'src/acces-roles/role.enum';
import { PaginationDto, PaginationSchema } from 'src/dto/pagination.dto';
import { AccesRoles } from 'src/acces-roles/acces-roles.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private reviewsService: ReviewsService,
    private userService: UsersService,
  ) {}

  @Get()
  @Public()
  getReviews(
    @Query(new ZodValidationPipe(PaginationSchema))
    paginationDto: PaginationDto,
  ) {
    try {
      return this.reviewsService.getReviews(paginationDto);
    } catch (error) {
      throw new HttpException(
        'Invalid query parameters',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @Public()
  async getReview(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.getReview({ id: id });
  }

  @Post()
  async createReview(
    @Body(new ZodValidationPipe(CreateReviewSchema))
    createReviewDto: CreateReviewSchemaDto,
    @Req() context: any,
  ) {
    console.log(createReviewDto);
    return this.reviewsService.createReview(
      await this.userService
        .getUser({ id: context.user.id })
        .then((user) => (user ? user.id : null)),
      createReviewDto,
    );
  }

  @Delete(':id')
  @AccesRoles(Role.Admin, Role.User)
  async deleteReview(
    @Req() context: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    if (
      context.user.role === Role.Admin ||
      (await this.reviewsService
        .getReview({ id: id })
        .then((review) => review.userId === context.user.id))
    ) {
      return this.reviewsService.deleteReview(id).catch(() => {
        throw new HttpException(
          `Review id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      });
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
