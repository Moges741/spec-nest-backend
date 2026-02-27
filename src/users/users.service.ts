import { Injectable, NotFoundException } from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async create(dto: CreateUserDto){
        return this.prisma.user.create({
            data: dto,
        })
    }
    async findAll(){
        return this.prisma.user.findMany();
    }

    async findOne(id: number){
        const user = await this.prisma.user.findUnique({
            where: {id},
        });
        if(!user){
            throw new NotFoundException('User Not Found!');
        }

        return user;
    }
    async update(id: number, dto: UpdateUserDto){
        const user = await this.prisma.user.findUnique({
            where: {id},
        })
         if(!user){
            throw new NotFoundException('User Not Found!');
        }
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
    }
    async remove(id: number) {

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
  
}
