import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT);
  app.enableCors(); // Habilita CORS
  app.use(cors());

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('BL API')
    .setDescription('API para o projeto BL')
    .setVersion('1.0')
    .addTag('bl')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const swagger = await NestFactory.create(AppModule, { cors: true });
  await swagger.listen(process.env.SWAGGER_PORT || 8082);
    

}
bootstrap();
