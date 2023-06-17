import { v4 as uuid } from 'uuid';

export class ServiceUtils {
  static createUuid(): string {
    return uuid();
  }
}
