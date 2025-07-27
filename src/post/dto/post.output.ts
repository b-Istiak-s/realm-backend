import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostOutput {
  @Field(() => Int)
  id: number;

  @Field()
  body: string;

  @Field()
  filePath: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
