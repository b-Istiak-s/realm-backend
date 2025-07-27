import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  await app.listen(process.env.PORT ?? 40000);
}
bootstrap();
