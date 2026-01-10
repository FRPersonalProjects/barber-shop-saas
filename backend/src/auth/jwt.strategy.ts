import 'dotenv/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

// const secretKey: string = process.env.SECRET_KEY;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject()
  private readonly prisma: PrismaService;
  constructor() {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error('SECRET_KEY env var is missing');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password: _, ...result } = user;
    return result;
  }
}
