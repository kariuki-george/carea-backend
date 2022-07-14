import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Address {
  /**Name of the specified address. User can have several addresses */

  name: string;
  /**Stringified location details */

  details: string;
}
