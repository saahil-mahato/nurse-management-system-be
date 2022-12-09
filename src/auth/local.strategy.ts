import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Auth } from './auth.schema';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Auth> {
    const loginDto: LoginDto = {
      username,
      password,
    };

    const auth = await this.authService.validateUser(loginDto);

    if (!auth) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return auth;
  }
}
