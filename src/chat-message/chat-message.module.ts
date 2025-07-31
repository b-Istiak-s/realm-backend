import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageResolver } from './chat-message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './chat-message.entity';
import { AuthModule } from 'src/shared/guards/auth.module';
import { ChatGateway } from './chat-message.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage]), AuthModule],
  providers: [ChatMessageService, ChatMessageResolver, ChatGateway],
  exports: [ChatGateway],
})
export class ChatMessageModule {}
