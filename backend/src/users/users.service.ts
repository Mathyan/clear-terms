import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;
  constructor(private prism: PrismaService) {}

  async User(
    userWhereUniquInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prism.user.findUnique({ where: userWhereUniquInput });
  }

  async getUsers(data: Prisma.UserFindManyArgs): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = data;
    return this.prism.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(
    data: Prisma.UserUncheckedCreateWithoutServiceReviewInput,
  ): Promise<User> {
    data.role = 1;
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;
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
