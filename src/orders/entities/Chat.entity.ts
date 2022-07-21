import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Chat {
  id: string;
  userId: string;
  carId: string;
}
