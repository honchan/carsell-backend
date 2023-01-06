import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  public getHello(): string {
    return 'Hello World!';
  }

  public handleEvent(event: any): void {
    console.log('handleEvent');
    console.log(JSON.stringify(event, null, 2));
  }
}
