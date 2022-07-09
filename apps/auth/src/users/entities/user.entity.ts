import { ObjectType, HideField, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'libs/database/abstract.schema';
import mongoose, { Document, Types } from 'mongoose';

export enum UserRoles {
  ADMIN = 'ADMIN',
  BUYER = 'BUYER',
  SUBADMIN = 'SUBADMIN',
}

import { Address, AddressSchema } from './address.entity';

@Schema({ versionKey: false })
@ObjectType()
export class User extends AbstractDocument {
  /**
   * User unique email
   */
  @Prop()
  email: string;

  @HideField()
  @Prop()
  password: string;

  /**
   * user's firstName
   */
  @Prop()
  firstName?: string;

  /**
   * user's lastName
   */
  @Prop()
  lastName?: string;

  /**
   * Check if a user's email is verified
   */

  @Prop({ default: false })
  verified?: boolean;

  /**
   * User's address list
   */
  @Field(() => [Address], { description: "User's address list" })
  @Prop({ type: [AddressSchema] })
  address?: [Address];

  /**
   * user's unique id
   */
  userId?: string;

  @Prop({ default: UserRoles.BUYER })
  @Field(() => String)
  role?: UserRoles;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
