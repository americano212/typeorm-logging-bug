import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';
import { middleware } from './app.middleware';
import { APIDocument } from './swagger.docs';
import { winstonLogger } from './config';
import { ValidationException } from './common/exceptions';

async function bootstrap(): Promise<string> {
  initializeTransactionalContext();

  const isProduction = process.env['NODE_ENV'] === 'production';

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: winstonLogger,
  });

  middleware(app);

  if (isProduction) app.enable('trust proxy');

  if (!isProduction) {
    const documentConfig = new APIDocument().initializeOptions();
    const document = SwaggerModule.createDocument(app, documentConfig);
    SwaggerModule.setup('/docs', app, document); // http://localhost/docs
  }

  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new ValidationException(errors),
      transform: true,
    }),
  );

  await app.listen(process.env['PORT'] || 3000);

  return app.getUrl();
}

void (async (): Promise<void> => {
  try {
    const url = await bootstrap();
    NestLogger.log(url, 'Bootstrap');
  } catch (error) {
    NestLogger.error(error, 'Bootstrap');
  }
})();
