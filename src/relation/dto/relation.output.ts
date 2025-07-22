import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserOutput } from 'src/user/dto/user.output';

@ObjectType()
export class RelationOutput {
  @Field(() => Int)
  id: number;

  @Field(() => UserOutput)
  requester: UserOutput;

  @Field(() => UserOutput)
  addressee: UserOutput;

  @Field(() => String)
  status: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
