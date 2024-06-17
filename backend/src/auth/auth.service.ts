import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Crypt } from 'src/crypt/crypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private crypt: Crypt,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, password: string) {
    const user = await this.userService.getUser({ username: username });
    console.log(password);
    console.log(user.password);
    console.log(await this.crypt.passwordCompare(password, user.password));
    if (!(await this.crypt.passwordCompare(password, user.password))) {
      throw new UnauthorizedException();
    }
    let admin = false;
    if (user.role == 2) {
      admin = true;
    }

    const payload = { sub: user.id, username: user.username, admin: admin };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
