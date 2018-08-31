/**
 * Server main
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UnknownRouteException } from './exceptions/UnknownRouteException';
import * as pug from 'pug';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appService = await app.get(AppService);
  const appController = await app.get(AppController);

  // app.useGlobalFilters(new UnknownRouteException(appController, appService));
  
  app.useStaticAssets(__dirname + '/../dist');
  app.setBaseViewsDir(__dirname + '/views');
  app.setViewEngine('pug');
  
  await app.listen(3000);
}
bootstrap();
