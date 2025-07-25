import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
