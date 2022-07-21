import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { ErrorInterface as Error } from '@carea/common/interfaces/error.entity';
import { Offer } from '../entities/Offer.entity';

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
      return Error;
    }
    return null;
  },
});
