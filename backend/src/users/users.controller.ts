import {
  Body,
  Controller,
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

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getUsers({});
  }

  // @Get('pagination')
  // async getUsers(@Query() paginationDto: PaginationDto): Promise<User[]> {
  //   return this.usersService.getUsers(paginationDto);
  // }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.User({ id: id });
  }
  @Post()
  async createUser(
    @Body(new ZodValidationPipe(CreateUserSchema)) createUserDto: CreateUserDto,
  ) {
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
}
