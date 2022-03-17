import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      //generate hashed password and
      const hash = await argon.hash(dto.password);
      //save the new user in db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash;
      const jwtToken= await this.signToken(user.id,user.email)
      return { jwtToken, message: 'User created successfully' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          //prisma error code for unique field
          throw new ForbiddenException('User with that Email already exists');
        }
      }
      throw error;
    }
  }
  async login(dto: AuthDto) {
    //findfirst will not throw error
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
        },
      });
      if (!user) throw new ForbiddenException('Invalid Credentials');
      const pwBool = await argon.verify(user.hash, dto.password);
      console.log(pwBool);
      if (!pwBool) throw new ForbiddenException('Invalid Credentials');
      delete user.hash;
      const jwtToken=await this.signToken(user.id,user.email)
      return { jwtToken, message: 'User logged in successfully' };
    } catch (error) {
      throw error;
    }
  }
  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret,
    });
  }
}
// 1.46
