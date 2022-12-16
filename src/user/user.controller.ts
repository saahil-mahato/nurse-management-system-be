import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

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
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.addNewUser(createUserDto);
  }
}
