import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {JwtService} from '@nestjs/jwt'
import { RegisterDto } from '../users/dto/register.dto';
import * as bcrypt from    'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService

    ){}
    async register(dto: RegisterDto){
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
            },
        });
        return "Created Successfully!"

    }


}
