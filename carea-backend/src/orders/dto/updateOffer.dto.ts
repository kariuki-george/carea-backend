import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { OfferStatus } from '../entities/Offer.entity';

registerEnumType(OfferStatus, {
  name: 'OfferStatus',
});

@InputType()
export class UpdateOfferInput {
  @IsPositive()
  @Field(() => Int)
  @IsOptional()
  amount?: number;
  @Field(() => OfferStatus)
  status?: OfferStatus;
  @IsInt()
  id: number;
}
