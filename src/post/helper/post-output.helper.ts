import { PostPaginatedOutput } from '../dto/post-paginated.output';
import { PostOutput } from '../dto/post.output';
import { Post } from '../post.entity';

export function toPostOutput(post: Post): PostOutput {
  return Object.assign(new PostOutput(), post);
}

export function toPostPaginatedOutput(data: {
  posts: Post[];
  total: number;
}): PostPaginatedOutput {
  return {
    posts: data.posts.map(toPostOutput),
    total: data.total,
  };
}
