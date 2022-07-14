import {
  Field,
  ID,
  InputType,
  Int,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
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

  @Field(() => [String])
  @IsArray()
  gallery: [string];
  @IsUrl()
  imageUrl: string;
  @IsNotEmpty()
  categoryId: string;
}
