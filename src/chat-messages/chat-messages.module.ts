import { Module } from '@nestjs/common';
import { ChatMessagesService } from './chat-messages.service';
import { ChatMessagesResolver } from './chat-messages.resolver';

@Module({
  providers: [ChatMessagesService, ChatMessagesResolver]
})
export class ChatMessagesModule {}
