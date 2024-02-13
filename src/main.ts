import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Challenge brain-ag API')
    .setDescription(
      'This API aims to fulfill the challenge of the company Brain-ag,' +
        ' always aiming to use the best practices to carry out this project',
    )
    .setVersion('1.0')
    .addTag('Challenge')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
