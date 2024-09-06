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
import { Prisma, User } from '@prisma/client';
import { AccesRoles } from 'src/acces-roles/acces-roles.decorator';
import { Role } from 'src/acces-roles/role.enum';
import { CreateUserDto, CreateUserSchema } from 'src/dto/create-user.dto';
import { PaginationDto, PaginationSchema } from 'src/dto/pagination.dto';
import { ZodValidationPipe } from 'src/zod.validation.pipe';
import { UsersService } from './users.service';
import { ModifyUserDto, ModifyUserSchema } from 'src/dto/modify-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @AccesRoles(Role.Admin, Role.User)
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

  @Post('create')
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

  @AccesRoles(Role.Admin, Role.User)
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Req() context: any,
  ): Promise<User> {
    if (context.user.role === Role.User && context.user.id !== id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    try {
      return this.usersService.deleteUser({ id: id });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // No record found
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('modify')
  async changeUserData(
    @Body(new ZodValidationPipe(ModifyUserSchema)) modifyUserDto: ModifyUserDto,
  ): Promise<User> {
    console.log(modifyUserDto);
    const id = modifyUserDto.id;
    delete modifyUserDto.id;
    try {
      return this.usersService.updateUser({
        where: { id: id },
        data: modifyUserDto as Prisma.UserUpdateInput,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // No record found
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
