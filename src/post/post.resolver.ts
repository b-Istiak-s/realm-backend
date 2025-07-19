import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostOutput } from './dto/post.output';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // Queries
  @Query(() => [PostOutput], { name: 'posts' })
  async getPosts() {
    return this.postService.getPosts();
  }

  @Query(() => PostOutput, { name: 'post', nullable: true })
  async getPost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.getPostById(id);
  }

  // Mutations
  @Mutation(() => PostOutput)
  async createPost(@Args('body') body: string) {
    return this.postService.createPost(body);
  }

  @Mutation(() => PostOutput, { nullable: true })
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('body') body: string,
  ) {
    return this.postService.updatePost(id, body);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id', { type: () => Int }) id: number) {
    await this.postService.deletePost(id);
    return true;
  }
}
