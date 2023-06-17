"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseApiKeyValidations = void 0;
const Joi = require("joi");
class UseApiKeyValidations {
    static useApiKeyValidator() {
        return Joi.object({
            apiKey: Joi.string().required(),
        });
    }
}
exports.UseApiKeyValidations = UseApiKeyValidations;
//# sourceMappingURL=use-api-key.validations.js.map