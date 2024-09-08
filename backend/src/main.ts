import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const isProd = configService.get<string>('NODE_ENV') === 'production';

  if (isProd) {
    const httpsOptions = {
      key: readFileSync(configService.get<string>('SSL_KEY_PATH')),
      cert: readFileSync(configService.get<string>('SSL_CERT_PATH')),
    };

    const httpsApp = await NestFactory.create(AppModule, { httpsOptions });
    await httpsApp.listen(3000, '0.0.0.0');
    console.log(`Application is running on HTTPS: ${await httpsApp.getUrl()}`);
  } else {
    await app.listen(3000, '0.0.0.0');
    console.log(`Application is running on HTTP: ${await app.getUrl()}`);
  }
}

bootstrap();
