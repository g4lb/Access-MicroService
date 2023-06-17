import * as Joi from 'joi';
export class RevokeApiKeyValidations {
  static revokeApiKeyValidator(): Joi.ObjectSchema<unknown> {
    return Joi.object({
      jwtToken: Joi.string().required(),
    });
  }
}
