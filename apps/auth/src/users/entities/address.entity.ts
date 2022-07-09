import {  ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Address {
  /**Name of the specified address. User can have several addresses */
  @Prop()
  name: string;
  /**Stringified location details */
  @Prop()
  details: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
