import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  oldPassword: string;
}
