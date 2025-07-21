import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ChatMessageOutput } from './chat-message.output';

@ObjectType()
export class ChatMessagePaginatedOutput {
  @Field(() => [ChatMessageOutput])
  messages: ChatMessageOutput[];

  @Field(() => Int)
  total: number;
} 