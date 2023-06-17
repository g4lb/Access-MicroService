import { NestMiddleware } from '@nestjs/common';
export declare class AuthenticatedUserMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): void;
    _authenticatedRequest(req: any): string | undefined;
}
