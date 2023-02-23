import { createUnionType, ObjectType } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

/**
 * returns the status of the verification process
 */
@ObjectType()
class ChangePasswordRequest {
  success: boolean;
}

export const ChangePasswordRequestResponse = createUnionType({
  name: 'ChangePasswordRequestResponse',
  description:
    'returns an user and error union. Use query.success to resolver for ChangePasswordRequest and query.error to resolver the error',
  types: () => [Error, ChangePasswordRequest] as const,

  resolveType(value) {
    if (value.success) {
      return ChangePasswordRequest;
    }
    if (value.error) {
      return  {error:boolean;message:string};
    }
    return null;
  },
});
