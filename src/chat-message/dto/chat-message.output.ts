import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserOutput } from 'src/user/dto/user.output';

@ObjectType()
export class ChatMessageOutput {
  @Field(() => Int)
  id: number;

  @Field(() => UserOutput)
  sender: UserOutput;

  @Field(() => String)
  message: String;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
