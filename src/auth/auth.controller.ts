import { Body, Controller, Post } from '@nestjs/common';

import { Auth } from './auth.schema';
import { SignupDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<Auth> {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  async login() {
    return this.authService.login();
  }
}
