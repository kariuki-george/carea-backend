import { createUnionType, ObjectType } from '@nestjs/graphql';
import { ErrorInterface as Error } from '@carea/common/interfaces/error.entity';
import { User } from '../users/entities/user.entity';

@ObjectType()
class Login {
  user: User;
  accessToken: string;
}

export const LoginResponse = createUnionType({
  name: 'LoginResponse',
  description:
    'Return error and login union. Resolve error with error field and resolve login with accesstoken or user field',
  types: () => [Error, Login] as const,
  resolveType(value) {
    if (value.accessToken || value.user) {
      return Login;
    }
    if (value.error) {
      return Error;
    }
    return null;
  },
});
