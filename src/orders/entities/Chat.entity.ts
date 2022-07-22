import { ObjectType } from '@nestjs/graphql';
import { CarProps } from 'src/carea/entities/car.entity';

@ObjectType()
export class Chat {
  id: string;
  userId: string;
  carId: string;
  messages?: MessageProps[];
  car: CarProps;
}

@ObjectType()
class MessageProps {
  message: string;
  createdAt: Date;
}
