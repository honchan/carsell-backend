import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Context, Handler } from 'aws-lambda';
import { AppModule } from './app/app.module';
import { AppService } from './app/app.service';

let cachedServer: Handler;
let cachedApp: INestApplication;

async function bootstrap(): Promise<Handler> {
  if (!cachedServer) {
    cachedApp = await NestFactory.create(AppModule);
    await cachedApp.init();

    const expressApp = cachedApp.getHttpAdapter().getInstance();
    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

export const handler = async (event: any, context: Context) => {
  // call AppService.handleEvent instead to handle s3event
  if (event.Records) {
    await bootstrap();
    const client = cachedApp.get(AppService);
    return client.handleEvent(event);
  }

  let server;
  // app will behave as normal handling http requests
  server = await bootstrap();
  return server(event, context);
};
