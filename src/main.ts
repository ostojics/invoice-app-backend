import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    methods: '*',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(8080);
}
bootstrap();
