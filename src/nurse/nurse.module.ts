import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Nurse, NurseSchema } from './nurse.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Nurse.name, schema: NurseSchema }]),
  ],
})
export class NurseModule {}
