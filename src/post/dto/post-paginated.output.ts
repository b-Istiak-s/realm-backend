import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostOutput } from './post.output';

@ObjectType()
export class PostPaginatedOutput {
  @Field(() => [PostOutput])
  posts: PostOutput[];

  @Field(() => Int)
  total: number;
} 