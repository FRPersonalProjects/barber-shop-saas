import 'dotenv/config'; // carregar variaveis de ambiente do .env antes de tudo
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { AuthStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

// console.log(process.env.SECRET_KEY);

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      // importar modulos para o servico de autenticacao
      global: true, // tornar o modulo global
      secret: process.env.SECRET_KEY, // chave secreta para assinar o token
      signOptions: { expiresIn: '3800s' }, // tempo de expiracao do token de pouco mais de 1 hora
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, JwtStrategy],
  exports: [AuthService], // exportar para uso em outros modulos
})
export class AuthModule {}
