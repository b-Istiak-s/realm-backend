import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RelationOutput } from './relation.output';

@ObjectType()
export class RelationPaginatedOutput {
  @Field(() => [RelationOutput])
  relationships: RelationOutput[];

  @Field(() => Int)
  total: number;
} 