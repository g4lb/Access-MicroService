import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyDao } from './api-key.dao';
import { RedisClient } from '../../lib/redis/redis-client';

@Module({
  providers: [ApiKeyService, ApiKeyDao, RedisClient],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
