import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import {MongoErrorFilter} from './common/filters/mongo-error/mongo-error.filter';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.useGlobalFilters(new MongoErrorFilter());
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://rzotr2.github.io',
    ],
    credentials: true,
  });
  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000); // update this line
}

bootstrap();
