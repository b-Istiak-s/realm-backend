import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;
}
