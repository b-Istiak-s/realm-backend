import { Args, Query, Resolver, Int } from '@nestjs/graphql';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageOutput } from './dto/chat-message.output';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { ChatMessagePaginatedOutput } from './dto/chat-message-paginated.output';

@UseGuards(AuthGuard)
@Resolver()
export class ChatMessageResolver {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  @Query(() => ChatMessagePaginatedOutput, { name: 'chatMessages' })
  async getChatMessageByChatId(
    @Args('chatId') chatId: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number,
  ): Promise<ChatMessagePaginatedOutput> {
    const { messages, total } =
      await this.chatMessageService.getMessagesByChatId(chatId, limit, offset);
    return { messages, total };
  }
}
