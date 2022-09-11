import { ErrorInterface as Error } from '@carea/common/interfaces/error.entity';
import { createUnionType, ObjectType } from '@nestjs/graphql';

/**
 * returns the status of the verification process
 */
@ObjectType()
class VerifyEmail {
  success: boolean;
}

export const VerifyEmailResponse = createUnionType({
  name: 'VerifyEmailResponse',
  description:
    'returns an user and error union. Use query.success to resolver for VerifyEmail and query.error to resolver the error',
  types: () => [Error, VerifyEmail] as const,

  resolveType(value) {
    if (value.success) {
      return VerifyEmail;
    }
    if (value.error) {
      return Error;
    }
    return null;
  },
});
