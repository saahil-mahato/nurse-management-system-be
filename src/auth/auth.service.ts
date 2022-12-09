import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';

import { LoginDto, SignupDto } from './auth.dto';
import { Auth, AuthDocument } from './auth.schema';

import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
  ) {}

  async signup(signupDto: SignupDto): Promise<Auth> {
    const createdUser: User = await this.userService.addNewUser(
      signupDto.userDetails,
    );
    const authData = {
      user: createdUser,
      username: signupDto.username,
      password: await bcrypt.hash(signupDto.password, 10),
    };
    const createdAuth = new this.authModel(authData);

    return createdAuth.save();
  }

  async findByUsername(username: string): Promise<Auth> {
    const auth = this.authModel.findOne({ username });

    return auth;
  }

  async validateUser(loginDto: LoginDto): Promise<Auth> {
    const auth = await this.findByUsername(loginDto.username);

    if (!auth) {
      return null;
    }

    if (!(await bcrypt.compare(loginDto.password, auth.password))) {
      return null;
    }

    return auth;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
