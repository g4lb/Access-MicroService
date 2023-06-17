import * as Joi from 'joi';
export class CreateApiKeyValidations {
  static createApiKeyValidator(): Joi.ObjectSchema<unknown> {
    return Joi.object({
      permissions: Joi.array().required(),
    });
  }
}
