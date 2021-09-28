import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT || 5000, () =>
    console.log(`server listening on ${process.env.PORT || 5000}`),
  );
}

bootstrap();
