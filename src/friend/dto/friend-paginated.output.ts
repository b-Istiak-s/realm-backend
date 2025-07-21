import { ObjectType, Field, Int } from '@nestjs/graphql';
import { FriendOutput } from './friend.output';

@ObjectType()
export class FriendPaginatedOutput {
  @Field(() => [FriendOutput])
  friendships: FriendOutput[];

  @Field(() => Int)
  total: number;
} 