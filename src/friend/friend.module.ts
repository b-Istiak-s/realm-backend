import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendResolver } from './friend.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './friend.entity';
import { AuthModule } from 'src/shared/guards/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Friend]), AuthModule],
  providers: [FriendService, FriendResolver],
})
export class FriendModule {}
