import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum OfferStatus {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  PROCESSING = 'PROCESSING',
}

registerEnumType(OfferStatus, {
  name: 'OfferStatus',
});

@ObjectType()
export class Offer {
  id?: number;
  carId?: number;
  userId?: number;
  amount?: number;

  @Field(() => OfferStatus)
  status?: string;
}
