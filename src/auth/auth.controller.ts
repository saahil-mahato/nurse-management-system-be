import {
  Res,
  Get,
  Body,
  Post,
  Request,
  UseGuards,
  Controller,
  Req,
} from '@nestjs/common';

import { Response, Request as RequestType } from 'express';

import { SignupDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

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
  async signup(@Body() signupDto: SignupDto): Promise<{ message: string }> {
    return this.authService.signup(signupDto);
  }

  /**
   * Function to signin a new user.
   * @param {any} req - the signin request.
   * @returns {Promise<any>}
   */
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(
    @Request() req: any,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    const jwt = await this.authService.signin(req.user);

    response.cookie('access_token', jwt, { httpOnly: true });

    return { message: 'success' };
  }

  @Get('user')
  async user(@Req() request: RequestType) {
    const cookie = request.cookies['access_token'];
    const data = await this.authService.verifyCookie(cookie);

    return data;
  }

  @Post('signout')
  async signout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    response.clearCookie('access_token');

    return { message: 'Success' };
  }
}
