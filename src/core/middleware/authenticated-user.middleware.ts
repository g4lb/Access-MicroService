import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthenticatedUserContext } from 'src/core/contexts/authenticated-user-context';

@Injectable()
export class AuthenticatedUserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): void {
    const userId = this._authenticatedRequest(req);
    const authenticatedUserContext: AuthenticatedUserContext = {
      userid: userId,
    };
    req.authenticatedUserContext = authenticatedUserContext;
    next();
  }

  _authenticatedRequest(req: any): string | undefined {
    return '12312312321';
  }
}
