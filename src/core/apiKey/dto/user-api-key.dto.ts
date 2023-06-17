export class UserApiKeyDto {
  userId: string;
  apiKey: string;
  permissions: Array<string>;
}
