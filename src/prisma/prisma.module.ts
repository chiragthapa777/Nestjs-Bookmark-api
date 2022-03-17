import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()//this service module will be available globally
//because every module will need this connection
@Module({
  providers: [PrismaService],
  exports:[PrismaService]
})
export class PrismaModule {}
