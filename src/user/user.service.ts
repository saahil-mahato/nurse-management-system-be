import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateUserDto } from './user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Function to add a new user.
   *
   * @param {CreateUserDto} createUserDto - the user details
   * @returns {Promise<User>}
   */
  async addNewUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  /**
   * Function to find a user by id.
   *
   * @param {string} id - the id of the user.
   * @returns {Promise<User>}
   */
  async findById(id: string): Promise<User> {
    const user = this.userModel.findById(id);

    return user;
  }
}
