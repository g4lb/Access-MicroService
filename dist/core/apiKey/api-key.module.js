"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyModule = void 0;
const common_1 = require("@nestjs/common");
const api_key_service_1 = require("./api-key.service");
const api_key_dao_1 = require("./api-key.dao");
const redis_client_1 = require("../../lib/redis/redis-client");
let ApiKeyModule = class ApiKeyModule {
};
ApiKeyModule = __decorate([
    (0, common_1.Module)({
        providers: [api_key_service_1.ApiKeyService, api_key_dao_1.ApiKeyDao, redis_client_1.RedisClient],
        exports: [api_key_service_1.ApiKeyService],
    })
], ApiKeyModule);
exports.ApiKeyModule = ApiKeyModule;
//# sourceMappingURL=api-key.module.js.map