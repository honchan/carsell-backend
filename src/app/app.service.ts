import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  handleEvent(event: any): void {
    // here we could call different services based on what event it is s3 or sqs message etc
    // do stuff with aws-sdk
    // we have to make sure to pass localhost:4566 or host.docker.internal into aws-sdk , i think host.docker.internal as its the container running the lambda to the container running localstack
    console.log('App Service: handleEvent ');
    console.log(event);
  }
}
