import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Crypt } from 'src/crypt/crypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private crypt: Crypt,
    private jwtService: JwtService
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.getUser({ username: username });

    if (user && await this.crypt.passwordCompare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null 
  }

  async login(user:any):Promise<{access_token:string}>{
    let admin = false;
    if (user.admin == 2){
      admin = true;
    }
    const payload = {username:user.username, sub:user.id,email:user.email,name:user.name, admin};
    return{
      access_token: this.jwtService.sign(payload)
    }
  }
}
