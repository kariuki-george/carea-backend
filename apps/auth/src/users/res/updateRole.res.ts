import { ErrorInterface as Error } from '@carea/common/interfaces/error.entity';
import { createUnionType, ObjectType } from '@nestjs/graphql';

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
      return Error;
    }
    return null;
  },
});
