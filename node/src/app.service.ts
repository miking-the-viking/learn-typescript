import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): {} {
    return {
      appData: {
        message: 'hi'
      }
    };
  }
}
