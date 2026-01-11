import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserController],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }, UserService],
  exports: [UserService],
})
export class UserModule {}
