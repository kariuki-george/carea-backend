import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  userId: string;
  addressId: string;

  carId: string;
  token?: string;
}
