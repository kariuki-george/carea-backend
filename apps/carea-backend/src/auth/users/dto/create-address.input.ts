import { InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

/**
 * Create an address for a user
 */
@InputType()
export class CreateAddressDto {
  /**
   * Name of the address
   */
  @IsNotEmpty()
  name: string;
  /**
   * stringified user location
   */
  @IsString()
  details: string;
}
