import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ILogger } from './core/logger/logger.interface';
import { NestLoggerAdapter } from './core/logger/nest-logger.adapter';

async function bootstrap() {
  // Create the app first
  const app = await NestFactory.create(AppModule);
  
  // Get the logger from the app's dependency injection container
  const logger = app.get(ILogger);
  const nestLogger = new NestLoggerAdapter(logger);
  
  // Set the logger for the app
  app.useLogger(nestLogger);

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Allow requests from this origin
  });

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Moba Game API')
    .setDescription('The Moba Game API description')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.info(`Application is running on: http://localhost:${port}`);
}
bootstrap();
