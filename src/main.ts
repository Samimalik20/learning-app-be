import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   console.log(process.env.AWS_ACCESS_KEY_ID_SES, 'ses access key');
    console.log(process.env.AWS_SECRET_ACCESS_KEY_SES, 'secret access key');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Online Learning Platform')
    .setDescription('NestJS + Sequelize + Swagger')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
