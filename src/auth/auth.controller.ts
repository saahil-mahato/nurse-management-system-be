import { Body, Request, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Auth } from './auth.schema';
import { SignupDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Endpoint to signup a new user.
   *
   * @param {SignupDto} signupDto - The details of the user.
   * @returns {Promise<Auth>}
   */
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<Auth> {
    return this.authService.signup(signupDto);
  }

  /**
   * Function to signin a new user.
   * @param {any} req - the signin request.
   * @returns {Promise<{ access_token: string }>}
   */
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(@Request() req: any): Promise<{ access_token: string }> {
    return this.authService.signin(req.user);
  }
}
