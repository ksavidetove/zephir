import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const config = app.get<ConfigType<typeof coreConfig>>(coreConfig.KEY);

  await app.listen(process.env.PORT || 4000, () => {
    console.log(`server listening on port ${process.env.PORT || 4000}`);
  });
}

bootstrap();
