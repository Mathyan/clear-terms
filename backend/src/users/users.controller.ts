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
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'src/zod.validation.pipe';
import { CreateUserDto, CreateUserSchema } from 'src/dto/create-user.dto';
import { PaginationDto, PaginationSchema } from 'src/dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  // @Get()
  // getAllUsers(): Promise<User[]> {
  //   return this.usersService.getUsers({});
  // }

  @Get()
  async getUsers(
    @Query(new ZodValidationPipe(PaginationSchema))
    paginationDto: PaginationDto,
  ): Promise<User[]> {
    console.log('PaginationDto: ', paginationDto);
    return this.usersService.getUsers(paginationDto);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUser({ id: id });
  }

  @Post()
  async createUser(
    @Body(new ZodValidationPipe(CreateUserSchema)) createUserDto: CreateUserDto,
  ): Promise<User> {
    try {
      const createdUser = await this.usersService.createUser(
        createUserDto as Prisma.UserCreateInput,
      );
      return createdUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // Unique constraint failed
          throw new HttpException(
            'User with this email or username already exists',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    try {
      return await this.usersService.deleteUser({ id: id });
    } catch {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
