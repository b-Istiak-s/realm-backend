import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginOutput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  accessToken: string;
}
