import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';

export const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType<GqlContextType>() === 'graphql') {
    //TODO: proper user extraction
  } else if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
};

export const Whoami = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getCurrentUserByContext(context);
  }
);
