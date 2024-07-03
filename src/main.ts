import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // activer le partage des ressourses inter origine
  app.enableCors();

  await app.listen(3000, () => 
    console.log('listening to port 3000')
  );
}
bootstrap();
