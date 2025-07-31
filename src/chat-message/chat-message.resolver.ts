import { Args, Query, Resolver, Int } from '@nestjs/graphql';
import { ChatMessageService } from './chat-message.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { ChatMessagePaginatedOutput } from './dto/chat-message-paginated.output';
import { toChatMessagePaginatedOutput } from './helper/chat-message-output.helper';

@UseGuards(AuthGuard)
@Resolver()
export class ChatMessageResolver {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  @Query(() => ChatMessagePaginatedOutput, { name: 'chatMessages' })
  async getChatMessageByChatId(
    @Args('chatId', { type: () => Int }) chatId: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number,
  ): Promise<ChatMessagePaginatedOutput> {
    const { messages, total } =
      await this.chatMessageService.getMessagesByChatId(chatId, limit, offset);
    return toChatMessagePaginatedOutput({ messages, total });
  }
}
