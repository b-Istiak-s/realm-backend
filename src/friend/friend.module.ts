import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendResolver } from './friend.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './friend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Friend])],
  providers: [FriendService, FriendResolver],
})
export class FriendModule {}
