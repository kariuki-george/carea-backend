import { createUnionType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { GraphQLError } from 'graphql';

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
      return  {error:boolean;message:string};
    }
    return null;
  },
});
