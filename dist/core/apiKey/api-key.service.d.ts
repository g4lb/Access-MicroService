/// <reference types="node" />
import { ApiKeyDao } from './api-key.dao';
import { CreateApiKeyDto } from 'src/access/dto/create-api-key.dto';
import { RevokeApiKeyDto } from 'src/access/dto/revoke-api-key.dto';
import { UseApiKeyDto } from 'src/access/dto/use-api-key.dto';
export declare class ApiKeyService {
    private apiKeyDao;
    constructor(apiKeyDao: ApiKeyDao);
    createApiKey(createApiKeyDto: CreateApiKeyDto): Promise<{
        apiKey: string;
    }>;
    useApiKey(useApiKeyDto: UseApiKeyDto): Promise<{
        jwtToken: string;
    }>;
    getUserApiKeysByUserId(userId: string): Promise<any>;
    getUserDataByApiKey(apiKey: string): Promise<any>;
    getUserDataByToken(jwtToken: string): Promise<any>;
    getLastTimeUsed(jwtToken: string, userId: string): Promise<any>;
    getJwtSecretBuffer(): Buffer;
    removeApiKey(revokeApiKeyDto: RevokeApiKeyDto): Promise<{
        removedApiKeyCount: number;
        numberOfApiKeysLeft: number;
    }>;
}
