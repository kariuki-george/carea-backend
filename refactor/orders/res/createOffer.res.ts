import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { Offer } from '../entities/Offer.entity';
import { GraphQLError } from 'graphql';

@ObjectType()
export class OfferRes {
  @Field(() => Offer)
  offer: Offer;
}

export const CreateOfferResponse = createUnionType({
  name: 'CreateOfferResponse',
  description:
    'Create an Offer union. returns offer property for success and errorInterface for error',
  types: () => [Error, OfferRes] as const,
  resolveType(value) {
    if (value.offer) {
      return OfferRes;
    }
    if (value.error) {
      return  {error:boolean;message:string};
    }
    return null;
  },
});
