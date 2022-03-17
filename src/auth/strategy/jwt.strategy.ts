import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtSrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(config:ConfigService,private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("JWT_SECRET"),
    });
  }
  async validate(payload: {sub:number; email:string}){
    const user=await this.prisma.user.findUnique({
      where:{
        id: payload.sub,
      }
    })
    // console.log({
    //   payload,
     // user 
    // })
    // it will append res.user= user in the request
    delete user.hash
    return user
  }
}
