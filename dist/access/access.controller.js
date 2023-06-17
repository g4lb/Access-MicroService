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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessController = void 0;
const common_1 = require("@nestjs/common");
const context_decorator_1 = require("../core/decorators/context.decorator");
const joi_validation_pipe_1 = require("../core/validations/joi-validation.pipe");
const access_service_1 = require("./access.service");
const create_api_key_request_1 = require("./dto/requests/create-api-key.request");
const revoke_api_key_request_1 = require("./dto/requests/revoke-api-key.request");
const use_api_key_request_1 = require("./dto/requests/use-api-key.request");
const create_api_key_validations_1 = require("./dto/validations/create-api-key.validations");
const revoke_api_key_validations_1 = require("./dto/validations/revoke-api-key.validations");
const use_api_key_validations_1 = require("./dto/validations/use-api-key.validations");
let AccessController = class AccessController {
    constructor(accessService) {
        this.accessService = accessService;
    }
    createApiKey(authenticatedUserContext, createApiKeyRequest) {
        const createApiKeyDto = {
            userId: authenticatedUserContext.userid,
            permissions: createApiKeyRequest.permissions,
        };
        return this.accessService.createApiKey(createApiKeyDto);
    }
    useApiKey(authenticatedUserContext, useApiKeyRequest) {
        const useApiKeyDto = {
            userId: authenticatedUserContext.userid,
            apiKey: useApiKeyRequest.apiKey,
        };
        return this.accessService.useApiKey(useApiKeyDto);
    }
    revokeApiKey(authenticatedUserContext, revokeApiKeyRequest) {
        const revokeApiKeyDto = {
            userId: authenticatedUserContext.userid,
            jwtToken: revokeApiKeyRequest.jwtToken,
        };
        return this.accessService.revokeApiKey(revokeApiKeyDto);
    }
    getTokens(authenticatedUserContext) {
        const getTokensDto = {
            userId: authenticatedUserContext.userid,
        };
        return this.accessService.getTokens(getTokensDto);
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, context_decorator_1.Context)()),
    __param(1, (0, common_1.Body)(new joi_validation_pipe_1.JoiValidationPipe(create_api_key_validations_1.CreateApiKeyValidations.createApiKeyValidator()))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_api_key_request_1.CreateApiKeyRequest]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "createApiKey", null);
__decorate([
    (0, common_1.Post)('/authenticate'),
    __param(0, (0, context_decorator_1.Context)()),
    __param(1, (0, common_1.Body)(new joi_validation_pipe_1.JoiValidationPipe(use_api_key_validations_1.UseApiKeyValidations.useApiKeyValidator()))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, use_api_key_request_1.UseApiKeyRequest]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "useApiKey", null);
__decorate([
    (0, common_1.Delete)('/revokeApiKey'),
    __param(0, (0, context_decorator_1.Context)()),
    __param(1, (0, common_1.Body)(new joi_validation_pipe_1.JoiValidationPipe(revoke_api_key_validations_1.RevokeApiKeyValidations.revokeApiKeyValidator()))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, revoke_api_key_request_1.RevokeApiKeyRequest]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "revokeApiKey", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, context_decorator_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "getTokens", null);
AccessController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [access_service_1.AccessService])
], AccessController);
exports.AccessController = AccessController;
//# sourceMappingURL=access.controller.js.map