import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthTokenService } from './auth/auth-token.service';
import { AuthToken } from './auth/auth-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, AuthToken])],
  providers: [UserService, UserResolver, AuthTokenService],
})
export class UserModule {}
