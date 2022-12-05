import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  middleName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ type: String, required: true })
  gender: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  contactNumber: string;

  @Prop({ type: String, required: true })
  designation: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
