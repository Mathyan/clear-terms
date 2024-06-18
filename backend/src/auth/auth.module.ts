import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { Crypt } from 'src/crypt/crypt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
    PassportModule,
  ],
  providers: [AuthService, Crypt, LocalStrategy , JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
