import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { BarbershopModule } from './barbershop/barbershop.module';
import { BarbershopServiceModule } from './barbershop-service/barbershop-service.module';
import { JwtAuthGuard } from './auth/jwt-auth.guards';

@Module({
  imports: [
    AuthModule,
    BarbershopModule,
    UserModule,
    BarbershopServiceModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD, // guard global
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
