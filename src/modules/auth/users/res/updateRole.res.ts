import { createUnionType, ObjectType } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

/**
 * returns the status of the verification process
 */
@ObjectType()
class UpdateRole {
  success: boolean;
}

export const UpdateRoleResponse = createUnionType({
  name: 'UpdateRoleResponse',
  description:
    'returns an user and error union. Use query.success to resolver for UpdateRole and query.error to resolver the error',
  types: () => [Error, UpdateRole] as const,

  resolveType(value) {
    if (value.success) {
      return UpdateRole;
    }
    if (value.error) {
      return  {error:boolean;message:string};
    }
    return null;
  },
});
