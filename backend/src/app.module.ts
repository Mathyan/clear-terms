import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PasswordStripInterceptor } from './password-strip/password-strip.interceptor';
import { AccesRolesGuard } from './acces-roles/acces-roles.guard';
import { AccesRolesModule } from './acces-roles/acces-roles.module';

@Module({
  imports: [UsersModule, ReviewsModule, AuthModule, AccesRolesModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccesRolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PasswordStripInterceptor,
    },
  ],
})
export class AppModule {}
