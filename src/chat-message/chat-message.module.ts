import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageResolver } from './chat-message.resolver';

@Module({
  providers: [ChatMessageService, ChatMessageResolver],
})
export class ChatMessageModule {}
