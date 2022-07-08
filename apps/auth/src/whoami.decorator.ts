import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Context, GqlExecutionContext } from '@nestjs/graphql';
import { User } from './users/entities/user.entity';

export const getCurrentUserByContext = (context: ExecutionContext): User => {
  /**
   * convert context from rest to graphql context
   */
  if (context.getType() === 'http') {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
};

export const Whoami = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    getCurrentUserByContext(context);
  }
);
