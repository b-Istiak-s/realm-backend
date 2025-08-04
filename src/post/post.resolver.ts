import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostOutput } from './dto/post.output';
import { PostPaginatedOutput } from './dto/post-paginated.output';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import type { FileUpload } from 'graphql-upload/processRequest.mjs';
import {
  toPostOutput,
  toPostPaginatedOutput,
} from './helper/post-output.helper';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // Queries
  @Query(() => PostPaginatedOutput, { name: 'postsByType' })
  async getPostsByType(
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number,
    @Args('type', { type: () => String, defaultValue: 'all' })
    type: String,
  ): Promise<PostPaginatedOutput> {
    const { posts, total } = await this.postService.getPostsByType(
      limit,
      offset,
      type,
    );
    return toPostPaginatedOutput({ posts, total });
  }

  @Query(() => PostPaginatedOutput, { name: 'postsByUser' })
  async getPostByUserId(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number,
  ): Promise<PostPaginatedOutput> {
    const { posts, total } = await this.postService.getPostByUserId(
      userId,
      limit,
      offset,
    );
    return toPostPaginatedOutput({ posts, total });
  }

  @Query(() => PostOutput, { name: 'post', nullable: true })
  async getPost(@Args('id', { type: () => Int }) id: number) {
    const post = await this.postService.getPostById(id);
    if (!post) return null;
    return toPostOutput(post);
  }

  // Mutations
  @UseGuards(AuthGuard)
  @Mutation(() => PostOutput)
  async createPost(
    @Args('body') body: string,
    @Args({ name: 'file', type: () => GraphQLUpload, nullable: true })
    file?: Promise<FileUpload>,
    @Context('req') req?: any,
  ) {
    return toPostOutput(await this.postService.createPost(body, file, req));
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PostOutput, { nullable: true })
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('body') body: string,
  ) {
    const post = await this.postService.getPostById(id);
    if (!post) return null;
    return toPostOutput(post);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deletePost(@Args('id', { type: () => Int }) id: number) {
    await this.postService.deletePost(id);
    return true;
  }
}
