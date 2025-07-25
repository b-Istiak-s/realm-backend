import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Allow any origin (only use this in dev)
  });

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
