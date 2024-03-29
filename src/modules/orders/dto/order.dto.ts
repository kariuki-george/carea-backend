import { InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @IsInt()
  userId: number;
  @IsInt()
  addressId: number;
  @IsInt()
  carId: number;
}

@InputType()
export class DeleteOrderInput {
  @IsInt()
  userId: number;
  @IsInt()
  orderId: number;
}
