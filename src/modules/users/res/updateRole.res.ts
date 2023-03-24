import { ObjectType } from '@nestjs/graphql';

/**
 * returns the status of the verification process
 */
@ObjectType()
export class UpdateRoleResponse {
  success: boolean;
}

// export const UpdateRoleResponse = createUnionType({
//   name: 'UpdateRoleResponse',
//   description:
//     'returns an user and error union. Use query.success to resolver for UpdateRole and query.error to resolver the error',
//   types: () => [Error, UpdateRole] as const,

//   resolveType(value) {
//     if (value) {
//       return UpdateRole;
//     }
//     if (value.error) {
//       return  {error:boolean;message:string};
//     }
//     return null;
//   },
// });
