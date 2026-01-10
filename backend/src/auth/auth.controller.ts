import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Prisma } from 'generated/prisma/client';
import { LocalAuthGuard } from './local-auth.guards';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: Prisma.UserCreateInput) {
    return this.authService.login(body);
  }
}
