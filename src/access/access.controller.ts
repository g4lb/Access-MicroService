import { Body, Delete, Get, Controller, Post } from '@nestjs/common';
import { AuthenticatedUserContext } from 'src/core/contexts/authenticated-user-context';
import { Context } from 'src/core/decorators/context.decorator';
import { JoiValidationPipe } from 'src/core/validations/joi-validation.pipe';
import { AccessService } from './access.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { GetTokensDto } from './dto/get-tokens.dto';
import { CreateApiKeyRequest } from './dto/requests/create-api-key.request';
import { RevokeApiKeyRequest } from './dto/requests/revoke-api-key.request';
import { UseApiKeyRequest } from './dto/requests/use-api-key.request';
import { RevokeApiKeyDto } from './dto/revoke-api-key.dto';
import { UseApiKeyDto } from './dto/use-api-key.dto';
import { CreateApiKeyValidations } from './dto/validations/create-api-key.validations';
import { RevokeApiKeyValidations } from './dto/validations/revoke-api-key.validations';
import { UseApiKeyValidations } from './dto/validations/use-api-key.validations';

@Controller('/')
export class AccessController {
  constructor(private accessService: AccessService) {}

  @Post('/')
  createApiKey(
    @Context() authenticatedUserContext: AuthenticatedUserContext,
    @Body(
      new JoiValidationPipe(CreateApiKeyValidations.createApiKeyValidator()),
    )
    createApiKeyRequest: CreateApiKeyRequest,
  ): Promise<any> {
    const createApiKeyDto: CreateApiKeyDto = {
      userId: authenticatedUserContext.userid,
      permissions: createApiKeyRequest.permissions,
    };
    return this.accessService.createApiKey(createApiKeyDto);
  }

  @Post('/authenticate')
  useApiKey(
    @Context() authenticatedUserContext: AuthenticatedUserContext,
    @Body(new JoiValidationPipe(UseApiKeyValidations.useApiKeyValidator()))
    useApiKeyRequest: UseApiKeyRequest,
  ): Promise<any> {
    const useApiKeyDto: UseApiKeyDto = {
      userId: authenticatedUserContext.userid,
      apiKey: useApiKeyRequest.apiKey,
    };
    return this.accessService.useApiKey(useApiKeyDto);
  }

  @Delete('/revokeApiKey')
  revokeApiKey(
    @Context() authenticatedUserContext: AuthenticatedUserContext,
    @Body(
      new JoiValidationPipe(RevokeApiKeyValidations.revokeApiKeyValidator()),
    )
    revokeApiKeyRequest: RevokeApiKeyRequest,
  ): Promise<any> {
    const revokeApiKeyDto: RevokeApiKeyDto = {
      userId: authenticatedUserContext.userid,
      jwtToken: revokeApiKeyRequest.jwtToken,
    };
    return this.accessService.revokeApiKey(revokeApiKeyDto);
  }

  @Get('/')
  getTokens(
    @Context() authenticatedUserContext: AuthenticatedUserContext,
  ): Promise<any> {
    const getTokensDto: GetTokensDto = {
      userId: authenticatedUserContext.userid,
    };
    return this.accessService.getTokens(getTokensDto);
  }
}
