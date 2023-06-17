import { Injectable } from '@nestjs/common';
import IORedis from 'ioredis';

@Injectable()
export class RedisClient {
  redis: IORedis.Redis;

  constructor() {
    this.redis = new IORedis(
      `redis://:${'xxx:xxx'}@${'127.0.0.1'}:${'6379'}/${0}`,
      {
        retryStrategy() {
          return 10000;
        },
      },
    );
  }
}
