import { Args, Context, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { ChatOutput } from './dto/chat.output';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ChatPaginatedOutput } from './dto/chat-paginated.output';
import {
  toChatOutput,
  toChatPaginatedOutput,
} from './helper/chat-output.helper';

@UseGuards(AuthGuard)
@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => ChatPaginatedOutput, { name: 'chats' })
  async getChatsByUserId(
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number,
    @Context('req') req?: any,
  ): Promise<ChatPaginatedOutput> {
    const { chats, total } = await this.chatService.getChatsByUserId(
      req.userId,
      limit,
      offset,
    );
    return toChatPaginatedOutput({ chats, total });
  }

  @Mutation(() => ChatOutput)
  async createChat(
    @Args('chatReceiverId') chatReceiverId: number,
    @Context('req') req: any,
  ): Promise<ChatOutput | null> {
    return toChatOutput(await this.chatService.createChat(chatReceiverId, req));
  }

  @Mutation(() => ChatOutput)
  async updateChat(
    @Args('id') id: number,
    @Args('lastMessage') lastMessage: string,
    @Args('lastMessageSenderId') lastMessageSenderId: number,
  ): Promise<ChatOutput> {
    return toChatOutput(
      await this.chatService.updateChat(id, lastMessage, lastMessageSenderId),
    );
  }
}
