import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NurseModule } from './nurse/nurse.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    NurseModule,
    MongooseModule.forRoot(
      'mongodb+srv://saahil:xLMjpTszF0cU5adN@cluster0.rruqn79.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
