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
exports.ApiKeyDao = void 0;
const common_1 = require("@nestjs/common");
const api_keys_enum_1 = require("../enums/api-keys.enum");
const redis_client_1 = require("../../lib/redis/redis-client");
let ApiKeyDao = class ApiKeyDao {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    async addApiKey(apiKey, apiKeyDto) {
        await this.redisClient.redis
            .multi()
            .hmset(`${api_keys_enum_1.ApiKeysEnums.API_KEY_ID}:${apiKey}`, apiKeyDto)
            .exec();
    }
    async useApiKey(token, apiKeyDto) {
        const lastTimeUsedData = { token, userId: apiKeyDto.userId };
        await this.redisClient.redis
            .multi()
            .hmset(`${api_keys_enum_1.ApiKeysEnums.API_TOKEN_ID}:${token}`, apiKeyDto)
            .sadd(`${api_keys_enum_1.ApiKeysEnums.API_USER_ID}:${apiKeyDto.userId}`, token)
            .zadd(api_keys_enum_1.ApiKeysEnums.API_LAST_TIME_USED, Date.now(), JSON.stringify(lastTimeUsedData))
            .exec();
    }
    async removeApiKey(userId, jwtToken) {
        const lastTimeUsedData = { token: jwtToken, userId: userId };
        const removeResult = await this.redisClient.redis
            .multi()
            .del(`${api_keys_enum_1.ApiKeysEnums.API_TOKEN_ID}:${jwtToken}`)
            .srem(`${api_keys_enum_1.ApiKeysEnums.API_USER_ID}:${userId}`, jwtToken)
            .zrem(api_keys_enum_1.ApiKeysEnums.API_LAST_TIME_USED, JSON.stringify(lastTimeUsedData))
            .scard(`${api_keys_enum_1.ApiKeysEnums.API_USER_ID}:${userId}`)
            .exec();
        const sremoveDeletedItems = removeResult[1][1];
        const zremoveDeletedItems = removeResult[2][1];
        const scardApiKeyCount = removeResult[3][1];
        const apiKeysRemoved = sremoveDeletedItems + zremoveDeletedItems;
        return {
            removedApiKeyCount: apiKeysRemoved,
            numberOfApiKeysLeft: scardApiKeyCount,
        };
    }
    async getApiKeysIdsByUserId(userId) {
        return this.redisClient.redis.smembers(`${api_keys_enum_1.ApiKeysEnums.API_USER_ID}:${userId}`);
    }
    async getUserDataByApiKey(apiKey) {
        return this.redisClient.redis.hgetall(`${api_keys_enum_1.ApiKeysEnums.API_KEY_ID}:${apiKey}`);
    }
    async getUserDataByToken(jwtToken) {
        return this.redisClient.redis.hgetall(`${api_keys_enum_1.ApiKeysEnums.API_TOKEN_ID}:${jwtToken}`);
    }
    async getLastTimeUsed(jwtToken, userId) {
        const sortedSetkey = `${api_keys_enum_1.ApiKeysEnums.API_LAST_TIME_USED}`;
        const lastTimeUsedData = { token: jwtToken, userId: userId };
        const value = JSON.stringify(lastTimeUsedData);
        return this.redisClient.redis.zscore(sortedSetkey, value);
    }
};
ApiKeyDao = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_client_1.RedisClient])
], ApiKeyDao);
exports.ApiKeyDao = ApiKeyDao;
//# sourceMappingURL=api-key.dao.js.map