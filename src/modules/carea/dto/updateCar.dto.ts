import { InputType, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreateCarInput } from './createCar.dto';

@InputType()
export class UpdateCarInput extends PartialType(CreateCarInput) {
  /**
   * Car's unique id.
   */
  @IsInt()
  carId: number;
}
