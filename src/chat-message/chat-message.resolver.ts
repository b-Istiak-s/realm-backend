import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageOutput } from './dto/chat-message.output';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Resolver()
export class ChatMessageResolver {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  @Query(() => [ChatMessageOutput], { name: 'chat-message' })
  async getChatMessageByChatId(
    @Args('chatId') chatId: number,
  ): Promise<ChatMessageOutput[]> {
    return this.chatMessageService.getMessagesByChatId(chatId);
  }
}
