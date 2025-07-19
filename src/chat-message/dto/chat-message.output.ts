import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Chat } from 'src/chat/chat.entity';
import { User } from 'src/user/user.entity';

@ObjectType()
export class ChatMessageOutput {
  @Field(() => Int)
  id: number;

  @Field(() => Chat)
  chat: Chat;

  @Field(() => User)
  sender: User;

  @Field(() => String)
  message: String;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
