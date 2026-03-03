import { Controller, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  // solve here? 

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
    controllers: [AppController]


  // imports: [UsersModule, PrismaModule, AuthModule],
 
})
export class AppModule {}