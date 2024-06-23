import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import { PaginationDto } from 'src/dto/pagination.dto';
import { Crypt } from 'src/crypt/crypt';

@Injectable()
export class UsersService {
  private crypt: Crypt;
  constructor(private prism: PrismaService) {
    this.crypt = new Crypt();
  }

  async getUser(
    userWhereUniquInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prism.user.findUnique({ where: userWhereUniquInput });
  }

  async getUsers(paginationDto: PaginationDto): Promise<User[]> {
    if (
      !paginationDto.cursor &&
      !paginationDto.orderBy &&
      !paginationDto.skip &&
      !paginationDto.take &&
      !paginationDto.where
    ) {
      return this.prism.user.findMany();
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

    return this.prism.user.findMany(parms);
  }

  async createUser(
    data: Prisma.UserUncheckedCreateWithoutServiceReviewInput,
  ): Promise<User> {
    data.role = 1;
    data.password = await this.crypt.passwordHash(data.password);
    return this.prism.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prism.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.getUser(where);
    if (user) {
      console.log(where);
      return this.prism.user.delete({
        where,
      });
    } else {
      throw new Error('User not found');
    }
  }
}
