import { InputType, PartialType } from '@nestjs/graphql';
import { Offer } from '../entities/Offer.entity';

@InputType()
export class GetOfferInput extends PartialType(Offer, InputType) {}
