/* eslint-disable @typescript-eslint/no-explicit-any */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUserContext } from 'src/core/contexts/authenticated-user-context';

export const Context = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUserContext => {
    const request = ctx.switchToHttp().getRequest();
    const req: any = request;
    return req.headers as AuthenticatedUserContext;
  },
);
