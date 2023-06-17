import { Injectable } from '@nestjs/common';
import { ApiKeyService } from 'src/core/apiKey/api-key.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { GetTokensDto } from './dto/get-tokens.dto';
import { RevokeApiKeyDto } from './dto/revoke-api-key.dto';
import { UseApiKeyDto } from './dto/use-api-key.dto';

@Injectable()
export class AccessService {
  constructor(private apiKeyService: ApiKeyService) {}
  async createApiKey(createApiKeyDto: CreateApiKeyDto): Promise<any> {
    return this.apiKeyService.createApiKey(createApiKeyDto);
  }

  async useApiKey(useApiKeyDto: UseApiKeyDto): Promise<any> {
    return this.apiKeyService.useApiKey(useApiKeyDto);
  }

  async revokeApiKey(revokeApiKeyDto: RevokeApiKeyDto): Promise<any> {
    return this.apiKeyService.removeApiKey(revokeApiKeyDto);
  }

  async getTokens(getTokensDto: GetTokensDto): Promise<any> {
    const getAllApiTokens: Array<string> | undefined =
      await this.apiKeyService.getUserApiKeysByUserId(getTokensDto.userId);
    const result = [];
    let view;
    for (const token of getAllApiTokens) {
      const getApiDetails: any = await this.apiKeyService.getUserDataByToken(
        token,
      );
      const getLastTimeUsed: any = await this.apiKeyService.getLastTimeUsed(
        token,
        getTokensDto.userId,
      );
      view = this._createCustomView(token, getApiDetails, getLastTimeUsed);
      result.push(view);
    }
    return result;
  }

  _createCustomView(
    token: string,
    getApiDetails: any | undefined,
    lastTimeUsed: number,
  ) {
    return {
      token: token.slice(-4),
      permissions: getApiDetails.permissions,
      lastTimeUsedApiKey: lastTimeUsed,
    };
  }
}
