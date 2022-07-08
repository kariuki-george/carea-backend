import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Context, GqlExecutionContext } from '@nestjs/graphql';
import { User } from './users/entities/user.entity';

export const getCurrentUserByContext = (
  context: ExecutionContext,
  isRest = false
): User => {
  /**
   * convert context from rest to graphql context
   */
  if (context.getType() === 'http') {
    if (isRest) {
      return context.switchToHttp().getRequest().user;
    }
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
};

export const Whoami = createParamDecorator(
  (rest: boolean, context: ExecutionContext) => {
    getCurrentUserByContext(context, rest);
  }
);
