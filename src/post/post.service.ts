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

  async createPost(body: string): Promise<Post> {
    const post = this.postRepo.create({ body });
    return this.postRepo.save(post);
  }

  async getPosts(): Promise<Post[]> {
    return this.postRepo.find();
  }

  async getPostByUserId(userId: number): Promise<Post[]> {
    return this.postRepo.find({ where: { user: { id: userId } } });
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
