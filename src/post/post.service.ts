import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async createPost(body: string, req: any): Promise<Post> {
    const post = this.postRepo.create({ body: body, user: { id: req.userId } });
    return this.postRepo.save(post);
  }

  async getPosts(limit: number, offset: number): Promise<{ posts: Post[]; total: number }> {
    const [posts, total] = await this.postRepo.findAndCount({
      take: limit,
      skip: offset,
    });
    return { posts, total };
  }

  async getPostByUserId(userId: number, limit: number, offset: number): Promise<{ posts: Post[]; total: number }> {
    const [posts, total] = await this.postRepo.findAndCount({
      where: { user: { id: userId } },
      take: limit,
      skip: offset,
    });
    return { posts, total };
  }

  async getPostById(id: number): Promise<Post | null> {
    return this.postRepo.findOneBy({ id });
  }

  async updatePost(id: number, body: string): Promise<Post | null> {
    await this.postRepo.update(id, { body });
    return this.getPostById(id);
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepo.delete(id);
  }
}
