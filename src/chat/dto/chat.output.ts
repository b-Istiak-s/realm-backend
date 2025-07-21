import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserOutput } from 'src/user/dto/user.output';
import { User } from 'src/user/user.entity';

@ObjectType()
export class ChatOutput {
  @Field(() => Int)
  id: number;

  @Field(() => UserOutput)
  chatInitiator: UserOutput;

  @Field(() => UserOutput)
  chatReceiver: UserOutput;

  @Field({ nullable: true })
  lastMessage?: string;

  @Field(() => UserOutput, { nullable: true })
  lastMessageSender: UserOutput | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
