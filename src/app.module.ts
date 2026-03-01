import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from '@nestjs/config'

@Module({
  // solve here?     
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  imports: [UsersModule, PrismaModule, AuthModule],
})
export class AppModule {}