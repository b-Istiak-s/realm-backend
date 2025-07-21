import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { ChatOutput } from './dto/chat.output';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@UseGuards(AuthGuard)
@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => [ChatOutput], { name: 'chats' })
  async getChatsByUserId(
    @Args('userId') userId: number,
  ): Promise<ChatOutput[]> {
    return this.chatService.getChatsByUserId(userId);
  }

  @Mutation(() => ChatOutput)
  async createChat(
    @Args('chatInitiatorId') chatInitiatorId: number,
    @Args('chatReceiverId') chatReceiverId: number,
  ): Promise<ChatOutput> {
    return this.chatService.createChat(chatInitiatorId, chatReceiverId);
  }

  @Mutation(() => ChatOutput)
  async updateChat(
    @Args('id') id: number,
    @Args('lastMessage') lastMessage: string,
    @Args('lastMessageSenderId') lastMessageSenderId: number,
  ): Promise<ChatOutput> {
    return this.chatService.updateChat(id, lastMessage, lastMessageSenderId);
  }
}
