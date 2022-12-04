import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return { message: 'You are logged in.' };
  }

  signup() {
    return { message: 'You are signed up.' };
  }
}
