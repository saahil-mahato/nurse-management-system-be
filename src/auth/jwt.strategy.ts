import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { Request as RequestType } from 'express';

import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: RequestType) => {
          const data = request?.cookies['access_token'];
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
    });
  }

  /**
   * Function to validate the payload of authentication.
   *
   * @param payload - the payload of user.
   * @returns {Promise<object>}
   */
  async validate(payload: any): Promise<object> {
    if (payload === null) {
      throw new UnauthorizedException();
    }

    return { _id: payload.id, username: payload.username };
  }
}
