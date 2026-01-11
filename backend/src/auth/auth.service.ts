import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly prisma: PrismaService;

  // servico responsavel pela autenticacao dos usuarios

  // metodo para validar o usuario
  // usado pelo LocalStrategy
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) throw new NotFoundException('Email nao encontrado');

    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordMatch) throw new UnauthorizedException('Senha incorreta');

    const { password: _, ...safeUser } = user; // omitindo a senha do usuario
    return safeUser;
  }

  // recebe o objeto usuario ja validado
  async login(user: any): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email }; // criando payload para o jwt

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
