import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCarInput } from './createCar.dto';

@InputType()
export class UpdateCarInput extends PartialType(CreateCarInput) {
  /**
   * Car's unique id.
   */
  carId: string;
}
