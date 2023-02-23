import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { CarCondition } from '../entities/car.entity';

registerEnumType(CarCondition, {
  name: 'CarCondition',
});

@InputType()
export class CreateCarInput {
  @IsNotEmpty()
  name: string;
  /**
   * The cars condition, whether new, used
   */
  @Field(() => CarCondition)
  condition: CarCondition;
  @IsNumber()
  @IsPositive()
  price: number;
  @IsNumber()
  @IsPositive()
  /**
   * How many cars are in stock
   */
  @Field(() => Int)
  stock: number;
  @IsString()
  desc: string;

  @IsInt()
  @IsPositive()
  categoryId: number;
}
