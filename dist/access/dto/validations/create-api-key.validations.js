"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateApiKeyValidations = void 0;
const Joi = require("joi");
class CreateApiKeyValidations {
    static createApiKeyValidator() {
        return Joi.object({
            permissions: Joi.array().required(),
        });
    }
}
exports.CreateApiKeyValidations = CreateApiKeyValidations;
//# sourceMappingURL=create-api-key.validations.js.map