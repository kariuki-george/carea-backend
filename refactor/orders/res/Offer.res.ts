import { Field, ObjectType } from '@nestjs/graphql';
import { CarProps } from '@src/carea/entities/car.entity';
import { Offer } from '../entities/Offer.entity';

@ObjectType()
export class GetOffers extends Offer {
  car: CarProps;
}
