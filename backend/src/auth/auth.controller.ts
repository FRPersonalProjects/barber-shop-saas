import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
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
  async signIn(
    @Req() req: Request, //pega o usuario ja validado pelo guardiao
    @Res({ passthrough: true }) res: Response, // resposta para setar o cookie
  ) {
    // user vem do return do validate() no auth.strategy.ts
    const user = req.user;

    // passa o objeto usuário direto, sem precisar de senha
    const { access_token } = await this.authService.login(user);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1 hora
      path: '/', // cookie valido para todo o site
    });
    return {
      ok: true,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return {
      ok: true,
    };
  }
}
