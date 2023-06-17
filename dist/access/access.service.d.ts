import { ApiKeyService } from 'src/core/apiKey/api-key.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { GetTokensDto } from './dto/get-tokens.dto';
import { RevokeApiKeyDto } from './dto/revoke-api-key.dto';
import { UseApiKeyDto } from './dto/use-api-key.dto';
export declare class AccessService {
    private apiKeyService;
    constructor(apiKeyService: ApiKeyService);
    createApiKey(createApiKeyDto: CreateApiKeyDto): Promise<any>;
    useApiKey(useApiKeyDto: UseApiKeyDto): Promise<any>;
    revokeApiKey(revokeApiKeyDto: RevokeApiKeyDto): Promise<any>;
    getTokens(getTokensDto: GetTokensDto): Promise<any>;
    _createCustomView(token: string, getApiDetails: any | undefined, lastTimeUsed: number): {
        token: string;
        permissions: any;
        lastTimeUsedApiKey: number;
    };
}
