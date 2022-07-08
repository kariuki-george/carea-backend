import { ObjectType, HideField } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'libs/database/abstract.schema';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
