import { ErrorInterface as Error } from '@carea/common/interfaces/error.entity';
import { createUnionType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

export const CreateUserResponse = createUnionType({
  name: 'CreateUserResponse',
  description:
    'returns an user and error union. Use query.email to resolver for user and query.error to resolver the error',
  types: () => [Error, User] as const,

  resolveType(value) {
    if (value.email) {
      return User;
    }
    if (value.error) {
      return Error;
    }
    return null;
  },
});
