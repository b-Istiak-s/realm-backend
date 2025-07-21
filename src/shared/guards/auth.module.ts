import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthToken } from 'src/user/auth/auth-token.entity';
import { AuthTokenService } from 'src/user/auth/auth-token.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthToken])],
  providers: [AuthTokenService],
  exports: [AuthTokenService],
})
export class AuthModule {}
