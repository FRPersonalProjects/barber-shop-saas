import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly prisma: PrismaService;

  // servico responsavel pela autenticacao dos usuarios

  // metodo para validar o usuario
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!user) return null;
    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');
    const { password: _, ...safeUser } = user; // omitindo a senha do usuario
    return safeUser;
  }

  // metodo para emitir o token jwt
  async login(params: {
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const user = await this.validateUser(params.email, params.password); // buscando usuario pelo email
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email }; // criando payload para o jwt

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
