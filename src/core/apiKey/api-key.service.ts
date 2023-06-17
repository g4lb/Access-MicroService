import { Injectable } from '@nestjs/common';
import { ServiceUtils } from 'src/utils/service.utils';
import { ApiKeyDao } from './api-key.dao';
import { ApiKeyDto } from './dto/api-key.dto';
import { CreateApiKeyDto } from 'src/access/dto/create-api-key.dto';
import { RevokeApiKeyDto } from 'src/access/dto/revoke-api-key.dto';
import { UseApiKeyDto } from 'src/access/dto/use-api-key.dto';
import { UserApiKeyDto } from './dto/user-api-key.dto';
import jsonwebtoken = require('jsonwebtoken');

@Injectable()
export class ApiKeyService {
  constructor(private apiKeyDao: ApiKeyDao) {}

  async createApiKey(
    createApiKeyDto: CreateApiKeyDto,
  ): Promise<{ apiKey: string }> {
    const apiKeyData: ApiKeyDto = {
      userId: createApiKeyDto.userId,
      permissions: createApiKeyDto.permissions,
    };
    const apiKey = ServiceUtils.createUuid();
    await this.apiKeyDao.addApiKey(apiKey, apiKeyData);
    return { apiKey };
  }

  async useApiKey(useApiKeyDto: UseApiKeyDto): Promise<{ jwtToken: string }> {
    const getUserByApiKey: any = await this.getUserDataByApiKey(
      useApiKeyDto.apiKey,
    );

    const userApiKeyDto: UserApiKeyDto = {
      userId: getUserByApiKey.userId,
      permissions: getUserByApiKey.permissions,
      apiKey: useApiKeyDto.apiKey,
    };
    const token = jsonwebtoken.sign(
      {
        sid: userApiKeyDto.apiKey,
      },
      this.getJwtSecretBuffer(),
    );
    await this.apiKeyDao.useApiKey(token, userApiKeyDto);
    return { jwtToken: token };
  }

  async getUserApiKeysByUserId(userId: string): Promise<any> {
    return this.apiKeyDao.getApiKeysIdsByUserId(userId);
  }

  async getUserDataByApiKey(apiKey: string): Promise<any> {
    return this.apiKeyDao.getUserDataByApiKey(apiKey);
  }

  async getUserDataByToken(jwtToken: string): Promise<any> {
    return this.apiKeyDao.getUserDataByToken(jwtToken);
  }
  async getLastTimeUsed(jwtToken: string, userId: string): Promise<any> {
    return this.apiKeyDao.getLastTimeUsed(jwtToken, userId);
  }

  getJwtSecretBuffer(): Buffer {
    const jwtSecret = 'jwt_secret';
    return Buffer.from(jwtSecret, 'base64');
  }

  async removeApiKey(revokeApiKeyDto: RevokeApiKeyDto): Promise<{
    removedApiKeyCount: number;
    numberOfApiKeysLeft: number;
  }> {
    const removeApiKeyRes = await this.apiKeyDao.removeApiKey(
      revokeApiKeyDto.userId,
      revokeApiKeyDto.jwtToken,
    );
    if (removeApiKeyRes.removedApiKeyCount < 2) {
      console.error(
        `API TOKEN with ID:${revokeApiKeyDto.jwtToken} for userId ${revokeApiKeyDto.userId} wasn't removed because we couldn't find him`,
      );
    }
    return removeApiKeyRes;
  }
}
