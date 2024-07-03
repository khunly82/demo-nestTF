import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // activer le partage des ressourses inter origine
  app.enableCors();

  // ajouter un middleware de validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, () => 
    console.log('listening to port 3000')
  );
}
bootstrap();
