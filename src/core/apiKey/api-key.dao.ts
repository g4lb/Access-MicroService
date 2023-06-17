import { Injectable } from '@nestjs/common';
import { ApiKeysEnums } from 'src/core/enums/api-keys.enum';
import { RedisClient } from 'src/lib/redis/redis-client';
import { ApiKeyDto } from './dto/api-key.dto';

@Injectable()
export class ApiKeyDao {
  constructor(private redisClient: RedisClient) {}

  async addApiKey(apiKey: string, apiKeyDto: ApiKeyDto): Promise<void> {
    await this.redisClient.redis
      .multi()
      .hmset(`${ApiKeysEnums.API_KEY_ID}:${apiKey}`, apiKeyDto)
      .exec();
  }

  async useApiKey(token: string, apiKeyDto: ApiKeyDto): Promise<void> {
    const lastTimeUsedData = { token, userId: apiKeyDto.userId };
    await this.redisClient.redis
      .multi()
      .hmset(`${ApiKeysEnums.API_TOKEN_ID}:${token}`, apiKeyDto)
      .sadd(`${ApiKeysEnums.API_USER_ID}:${apiKeyDto.userId}`, token)
      .zadd(
        ApiKeysEnums.API_LAST_TIME_USED,
        Date.now(),
        JSON.stringify(lastTimeUsedData),
      )
      .exec();
  }

  async removeApiKey(
    userId: string,
    jwtToken: string,
  ): Promise<{
    removedApiKeyCount: number;
    numberOfApiKeysLeft: number;
  }> {
    const lastTimeUsedData = { token: jwtToken, userId: userId };
    const removeResult = await this.redisClient.redis
      .multi()
      .del(`${ApiKeysEnums.API_TOKEN_ID}:${jwtToken}`)
      .srem(`${ApiKeysEnums.API_USER_ID}:${userId}`, jwtToken)
      .zrem(ApiKeysEnums.API_LAST_TIME_USED, JSON.stringify(lastTimeUsedData))
      .scard(`${ApiKeysEnums.API_USER_ID}:${userId}`)
      .exec();
    // How many session was removed from sessionHashMap and how may session was remove from user set
    const sremoveDeletedItems = removeResult[1][1];
    const zremoveDeletedItems = removeResult[2][1];
    const scardApiKeyCount = removeResult[3][1];
    const apiKeysRemoved = sremoveDeletedItems + zremoveDeletedItems;
    return {
      removedApiKeyCount: apiKeysRemoved,
      numberOfApiKeysLeft: scardApiKeyCount,
    };
  }

  async getApiKeysIdsByUserId(userId: string): Promise<Array<string>> {
    return this.redisClient.redis.smembers(
      `${ApiKeysEnums.API_USER_ID}:${userId}`,
    );
  }

  async getUserDataByApiKey(apiKey: string): Promise<Array<string>> {
    return this.redisClient.redis.hgetall(
      `${ApiKeysEnums.API_KEY_ID}:${apiKey}`,
    );
  }

  async getUserDataByToken(jwtToken: string): Promise<any> {
    return this.redisClient.redis.hgetall(
      `${ApiKeysEnums.API_TOKEN_ID}:${jwtToken}`,
    );
  }

  async getLastTimeUsed(jwtToken: string, userId: string): Promise<any> {
    const sortedSetkey = `${ApiKeysEnums.API_LAST_TIME_USED}`;
    const lastTimeUsedData = { token: jwtToken, userId: userId };
    const value = JSON.stringify(lastTimeUsedData);
    return this.redisClient.redis.zscore(sortedSetkey, value);
  }
}
