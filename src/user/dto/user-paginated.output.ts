import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserOutput } from './user.output';

@ObjectType()
export class UserPaginatedOutput {
  @Field(() => [UserOutput])
  users: UserOutput[];

  @Field(() => Int)
  total: number;
} 