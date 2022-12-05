import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return { message: 'You are signed up.' };
  }

  login() {
    return { message: 'You are logged in.' };
  }
}
