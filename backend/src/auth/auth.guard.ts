/* import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: string | object;
  userId?: string | number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private readonly jwtService: JwtService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token is required');
    }
    try {
      const payload = await this.jwtService.verifyAsync<{ sub?: string }>(
        token,
        {
          secret: process.env.SECRET_KEY,
        },
      );

      request.user = payload;
      request.userId = payload.sub;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(
    request: AuthenticatedRequest,
  ): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

// autorization Bearer <token>
 */
