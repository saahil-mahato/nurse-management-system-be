import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from 'src/user/user.schema';

export type authDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  @Prop({ required: true })
  passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
