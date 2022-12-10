import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';

import { SigninDto, SignupDto } from './auth.dto';
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

  /**
   * Function to signup a new user.
   * @param signupDto - the user details.
   * @returns {Promise<Auth>}
   */
  async signup(signupDto: SignupDto): Promise<Auth> {
    const createdUser: User = await this.userService.addNewUser(
      signupDto.userDetails,
    );
    const authData = {
      user: createdUser,
      username: signupDto.username,
      password: await bcrypt.hash(signupDto.password, 8),
    };
    const createdAuth = new this.authModel(authData);

    return createdAuth.save();
  }

  /**
   * Function to find the auth by username.
   *
   * @param {string} username - the username of the user.
   * @returns {Promise<Auth>}
   */
  async findByUsername(username: string): Promise<Auth> {
    const auth = this.authModel.findOne({ username });

    return auth;
  }

  /**
   * Function to check if the user attempting to signin is a valid user.
   * @param {SigninDto} signinDto - the signin details.
   * @returns {Promise<Auth>}
   */
  async validateUser(signinDto: SigninDto): Promise<Auth> {
    const auth = await this.findByUsername(signinDto.username);

    if (!auth) {
      return null;
    }

    if (!(await bcrypt.compare(signinDto.password, auth.password))) {
      return null;
    }

    return auth;
  }

  /**
   * Function to signin a user and send the access token.
   *
   * @param {any} user - the user object
   * @returns {{Promise<{ access_token: string }>}}
   */
  async signin(user: any): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
