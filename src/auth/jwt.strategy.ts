import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Function to validate the payload of authentication.
   *
   * @param payload - the payload of user.
   * @returns {Promise<object>}
   */
  async validate(payload: any): Promise<object> {
    return { _id: payload.sub, username: payload.username };
  }
}
