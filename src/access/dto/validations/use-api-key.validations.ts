import * as Joi from 'joi';
export class UseApiKeyValidations {
  static useApiKeyValidator(): Joi.ObjectSchema<unknown> {
    return Joi.object({
      apiKey: Joi.string().required(),
    });
  }
}
