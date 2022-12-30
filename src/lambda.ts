import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app/app.module';
import { AppService } from './app/app.service';

let server: Handler;
let cachedApp: INestApplication;

async function bootstrap(): Promise<Handler> {
  if (!server) {
    cachedApp = await NestFactory.create(AppModule);
    await cachedApp.init();

    const expressApp = cachedApp.getHttpAdapter().getInstance();
    server = serverlessExpress({ app: expressApp });
  }

  return server;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  // call AppService.handleEvent instead
  if (event.Records) {
    await bootstrap();
    const client = cachedApp.get(AppService);
    client.handleEvent(event);
  }

  // app will behave as normal handling requests
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
