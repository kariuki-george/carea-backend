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
  id?: string;
  carId?: string;
  userId?: string;
  amount?: number;
 
  @Field(() => OfferStatus)
  status?: string;
}
