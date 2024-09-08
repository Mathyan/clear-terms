import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Role } from 'src/acces-roles/role.enum';
import { Crypt } from 'src/crypt/crypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private crypt: Crypt,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser({ email: email });

    if (user && (await this.crypt.passwordCompare(password, user.password))) {
      const { password: _password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any, res: Response): Promise<void> {
    let role = Role.User;
    if (user.role == 2) {
      role = Role.Admin;
    }
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
      name: user.name,
      role: role,
    };

    const token = this.jwtService.sign(payload);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 3600000,
    });
  }
}
