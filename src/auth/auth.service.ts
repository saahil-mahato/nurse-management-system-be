import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { SignupDto } from './auth.dto';
import { Auth, AuthDocument } from './auth.schema';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
  ) {}

  async signup(signupDto: SignupDto): Promise<Auth> {
    const createdUser = await this.userService.addNewUser(
      signupDto.userDetails,
    );
    const authData = {
      user: createdUser,
      username: signupDto.username,
      passwordHash: signupDto.passwordHash,
    };
    const createdAuth = new this.authModel(authData);

    return createdAuth.save();
  }

  login() {
    return { message: 'You are logged in.' };
  }
}
