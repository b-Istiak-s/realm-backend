import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatMessageOutput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  message: String;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
