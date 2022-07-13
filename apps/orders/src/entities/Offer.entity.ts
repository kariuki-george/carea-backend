import { ObjectType } from '@nestjs/graphql';

export enum OfferStatus {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  PROCESSING = 'PROCESSING',
}

@ObjectType()
export class Offer {
  id?: string;
  carId?: string;
  userId?: string;
  amount?: number;
}
