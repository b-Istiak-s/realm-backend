import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FriendOutput {
  @Field(() => Number)
  id: number;

  @Field(() => Number)
  requester: number;

  @Field(() => Number)
  addressee: number;

  @Field(() => String)
  status: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
