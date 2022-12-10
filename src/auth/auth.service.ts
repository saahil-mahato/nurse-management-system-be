import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
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
  async signup(signupDto: SignupDto): Promise<{ message: string }> {
    const createdUser: User = await this.userService.addNewUser(
      signupDto.userDetails,
    );

    const authData = {
      user: createdUser,
      username: signupDto.username,
      password: await bcrypt.hash(signupDto.password, 8),
    };

    try {
      await new this.authModel(authData).save();

      return { message: 'Success' };
    } catch (err) {
      throw new BadRequestException('Username already exists');
    }
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
  async signin(user: any): Promise<string> {
    const payload = { username: user.username, id: user._id };

    return this.jwtService.sign(payload);
  }

  /**
   * Function to verify a cookie
   *
   * @param {any} cookie
   */
  async verifyCookie(cookie: any) {
    try {
      const data = this.jwtService.verify(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const auth = await this.authModel.findById(data.id).populate('user');

      const user = auth.user;

      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
