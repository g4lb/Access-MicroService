"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyService = void 0;
const common_1 = require("@nestjs/common");
const service_utils_1 = require("../../utils/service.utils");
const api_key_dao_1 = require("./api-key.dao");
const jsonwebtoken = require("jsonwebtoken");
let ApiKeyService = class ApiKeyService {
    constructor(apiKeyDao) {
        this.apiKeyDao = apiKeyDao;
    }
    async createApiKey(createApiKeyDto) {
        const apiKeyData = {
            userId: createApiKeyDto.userId,
            permissions: createApiKeyDto.permissions,
        };
        const apiKey = service_utils_1.ServiceUtils.createUuid();
        await this.apiKeyDao.addApiKey(apiKey, apiKeyData);
        return { apiKey };
    }
    async useApiKey(useApiKeyDto) {
        const getUserByApiKey = await this.getUserDataByApiKey(useApiKeyDto.apiKey);
        const userApiKeyDto = {
            userId: getUserByApiKey.userId,
            permissions: getUserByApiKey.permissions,
            apiKey: useApiKeyDto.apiKey,
        };
        const token = jsonwebtoken.sign({
            sid: userApiKeyDto.apiKey,
        }, this.getJwtSecretBuffer());
        await this.apiKeyDao.useApiKey(token, userApiKeyDto);
        return { jwtToken: token };
    }
    async getUserApiKeysByUserId(userId) {
        return this.apiKeyDao.getApiKeysIdsByUserId(userId);
    }
    async getUserDataByApiKey(apiKey) {
        return this.apiKeyDao.getUserDataByApiKey(apiKey);
    }
    async getUserDataByToken(jwtToken) {
        return this.apiKeyDao.getUserDataByToken(jwtToken);
    }
    async getLastTimeUsed(jwtToken, userId) {
        return this.apiKeyDao.getLastTimeUsed(jwtToken, userId);
    }
    getJwtSecretBuffer() {
        const jwtSecret = 'jwt_secret';
        return Buffer.from(jwtSecret, 'base64');
    }
    async removeApiKey(revokeApiKeyDto) {
        const removeApiKeyRes = await this.apiKeyDao.removeApiKey(revokeApiKeyDto.userId, revokeApiKeyDto.jwtToken);
        if (removeApiKeyRes.removedApiKeyCount < 2) {
            console.error(`API TOKEN with ID:${revokeApiKeyDto.jwtToken} for userId ${revokeApiKeyDto.userId} wasn't removed because we couldn't find him`);
        }
        return removeApiKeyRes;
    }
};
ApiKeyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_key_dao_1.ApiKeyDao])
], ApiKeyService);
exports.ApiKeyService = ApiKeyService;
//# sourceMappingURL=api-key.service.js.map