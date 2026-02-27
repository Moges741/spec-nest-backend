import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
