import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Chat } from 'src/chat/chat.entity';
import { ChatOutput } from 'src/chat/dto/chat.output';
import { UserOutput } from 'src/user/dto/user.output';

@ObjectType()
export class ChatMessageOutput {
  @Field(() => Int)
  id: number;

  @Field(() => ChatOutput)
  chat: ChatOutput;

  @Field(() => UserOutput)
  sender: UserOutput;

  @Field(() => String)
  message: String;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
