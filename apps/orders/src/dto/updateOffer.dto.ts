import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';
import { OfferStatus } from '../entities/Offer.entity';

registerEnumType(OfferStatus, {
  name: 'OfferStatus',
});

@InputType()
export class UpdateOfferInput {
  @IsPositive()
  @Field(() => Int)
  amount?: number;
  @Field(() => OfferStatus)
  status?: OfferStatus;
  id:string
}
