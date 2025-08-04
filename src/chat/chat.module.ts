import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { User } from 'src/user/user.entity';
import { AuthModule } from 'src/shared/guards/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User]), AuthModule],
  providers: [ChatService, ChatResolver],
  exports: [ChatService],
})
export class ChatModule {}
