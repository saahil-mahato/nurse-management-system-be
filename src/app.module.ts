import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NurseModule } from './nurse/nurse.module';

@Module({
  imports: [AuthModule, UserModule, NurseModule],
})
export class AppModule {}
