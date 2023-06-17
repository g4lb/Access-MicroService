import { RedisClient } from 'src/lib/redis/redis-client';
import { ApiKeyDto } from './dto/api-key.dto';
export declare class ApiKeyDao {
    private redisClient;
    constructor(redisClient: RedisClient);
    addApiKey(apiKey: string, apiKeyDto: ApiKeyDto): Promise<void>;
    useApiKey(token: string, apiKeyDto: ApiKeyDto): Promise<void>;
    removeApiKey(userId: string, jwtToken: string): Promise<{
        removedApiKeyCount: number;
        numberOfApiKeysLeft: number;
    }>;
    getApiKeysIdsByUserId(userId: string): Promise<Array<string>>;
    getUserDataByApiKey(apiKey: string): Promise<Array<string>>;
    getUserDataByToken(jwtToken: string): Promise<any>;
    getLastTimeUsed(jwtToken: string, userId: string): Promise<any>;
}
