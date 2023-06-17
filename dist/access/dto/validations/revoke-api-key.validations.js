"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevokeApiKeyValidations = void 0;
const Joi = require("joi");
class RevokeApiKeyValidations {
    static revokeApiKeyValidator() {
        return Joi.object({
            jwtToken: Joi.string().required(),
        });
    }
}
exports.RevokeApiKeyValidations = RevokeApiKeyValidations;
//# sourceMappingURL=revoke-api-key.validations.js.map