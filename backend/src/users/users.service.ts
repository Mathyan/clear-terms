import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import { PaginationDto } from 'src/pagination-dto/pagination-dto';

@Injectable()
export class UsersService {
  constructor(private prism: PrismaService) {}

  async User(
    userWhereUniquInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prism.user.findUnique({ where: userWhereUniquInput });
  }

  async getUsers(paginationDto: PaginationDto): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = paginationDto;
    return this.prism.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    data.role = data.role ?? 1;
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
    return this.prism.user.delete({
      where,
    });
  }
}
