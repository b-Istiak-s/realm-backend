import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ChatOutput } from './chat.output';

@ObjectType()
export class ChatPaginatedOutput {
  @Field(() => [ChatOutput])
  chats: ChatOutput[];

  @Field(() => Int)
  total: number;
} 