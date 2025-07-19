import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
export class ChatOutput {
  @Field(() => Int)
  id: number;

  @Field(() => User)
  chatInitiator: User;

  @Field(() => User)
  chatReceiver: User;

  @Field()
  lastMessage?: string;

  @Field(() => User, { nullable: true })
  lastMessageSender?: User;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
