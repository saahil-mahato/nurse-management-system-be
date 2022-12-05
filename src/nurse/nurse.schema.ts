import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Timestamp, timestamp } from 'rxjs';

import { User } from 'src/user/user.schema';

export type NurseDocument = HydratedDocument<Nurse>;

@Schema()
export class Nurse extends User {
  @Prop({ type: String, required: true })
  department: string;

  @Prop({ type: Boolean, required: true })
  isRoundingManager: boolean;

  @Prop({ type: timestamp, required: true })
  dutyStartTime: Timestamp<number>;

  @Prop({ type: timestamp, required: true })
  dutyEndTime: Timestamp<number>;

  @Prop({ type: Array<string>, required: true })
  workingDays: Array<string>;
}

export const NurseSchema = SchemaFactory.createForClass(Nurse);
