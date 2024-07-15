import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // activer le partage des ressources inter origine
  app.enableCors();

  // ajouter un middleware de validation
  app.useGlobalPipes(new ValidationPipe());

  // configuration OPEN API
  const config = new DocumentBuilder()
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  await app.listen(3000, () => 
    console.log('listening to port 3000')
  );
}
bootstrap();
