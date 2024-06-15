import { Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { PaginationDto } from 'src/pagination-dto/pagination-dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getUsers({});
  }

  @Get()
  async getUsers(
    @Query() paginationDto: PaginationDto,
  ): Promise<User[] | null> {
    return this.usersService.getUsers(paginationDto);
  }
}
