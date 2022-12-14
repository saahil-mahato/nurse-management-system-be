import { Body, Controller, Post } from '@nestjs/common';

import { User } from './user.schema';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Endpoint to add a new user.
   *
   * @param {CreateUserDto} createUserDto - the user details.
   * @returns {Promise<User>}
   */
  @Post('/')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.addNewUser(createUserDto);
  }
}
