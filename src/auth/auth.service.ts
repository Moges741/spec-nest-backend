import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {JwtService} from '@nestjs/jwt'
import { RegisterDto } from '../users/dto/register.dto';
import * as bcrypt from    'bcrypt';
import { LoginDto } from '../users/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService

    ){}
    async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });

    return { message: 'User registered successfully' };
  }

  async login(dto: LoginDto){
    const user = await this.prisma.user.findUnique({
        where: {email: dto.email},
    })
    if(!user){
        throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if(!isMatch){
        throw new UnauthorizedException("Invalid credentials!");
    }
    const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
    };
    const token = this.jwtService.sign(payload);
    return {
        access_token: token,
    }

  }


}
