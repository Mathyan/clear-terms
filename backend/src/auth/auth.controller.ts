import { Request, Controller, Post, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from 'src/public-metadata/public-metadata.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Request() req: any, @Res() res: Response): Promise<void> {
    await this.authService.login(req.user, res);

    res.status(200).json({ message: 'Login successful' });
  }

  @Post('logout')
  async signOut(@Res() res: Response): Promise<void> {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logout successful' });
  }
}
