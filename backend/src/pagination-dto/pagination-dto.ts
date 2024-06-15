import { IsInt, IsOptional, IsString, Min, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  take?: number;

  @IsOptional()
  @IsObject()
  cursor?: Prisma.UserWhereUniqueInput;

  @IsOptional()
  @IsObject()
  where?: Prisma.UserWhereInput;

  @IsOptional()
  @IsObject()
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
