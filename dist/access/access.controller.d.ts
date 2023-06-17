import { AuthenticatedUserContext } from 'src/core/contexts/authenticated-user-context';
import { AccessService } from './access.service';
import { CreateApiKeyRequest } from './dto/requests/create-api-key.request';
import { RevokeApiKeyRequest } from './dto/requests/revoke-api-key.request';
import { UseApiKeyRequest } from './dto/requests/use-api-key.request';
export declare class AccessController {
    private accessService;
    constructor(accessService: AccessService);
    createApiKey(authenticatedUserContext: AuthenticatedUserContext, createApiKeyRequest: CreateApiKeyRequest): Promise<any>;
    useApiKey(authenticatedUserContext: AuthenticatedUserContext, useApiKeyRequest: UseApiKeyRequest): Promise<any>;
    revokeApiKey(authenticatedUserContext: AuthenticatedUserContext, revokeApiKeyRequest: RevokeApiKeyRequest): Promise<any>;
    getTokens(authenticatedUserContext: AuthenticatedUserContext): Promise<any>;
}
