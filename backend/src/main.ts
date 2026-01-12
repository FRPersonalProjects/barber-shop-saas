import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser = require('cookie-parser');
import 'dotenv/config';

// console.log('Database URL:', process.env.DATABASE_URL);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addServer('http://localhost:8080')
    .setTitle('TrimTech')
    .setDescription('Saas API')
    .setVersion('1.0')
    .build();

  const documentFactory = (): OpenAPIObject =>
    SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.use(cookieParser());
  const allowedOrigins = ['http://localhost:3000', 'https://localhost:3000'];
  app.enableCors({
    origin: (origin, callback) => {
      // allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS origin not allowed'), false);
    },
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
