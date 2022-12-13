import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NurseService } from './nurse.service';
import { Nurse, NurseSchema } from './nurse.schema';
import { NurseController } from './nurse.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Nurse.name, schema: NurseSchema }]),
  ],
  controllers: [NurseController],
  providers: [NurseService],
})
export class NurseModule {}
