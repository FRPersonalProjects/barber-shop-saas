import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // passport-local expects 'username' by default — configure it to use 'email'
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
