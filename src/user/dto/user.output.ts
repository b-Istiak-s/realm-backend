import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  email: string;
}
