import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { FileUpload } from 'graphql-upload/processRequest.mjs';
import { fileUpload } from 'src/shared/files/file.upload';
import { join } from 'path';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async createPost(
    body: string,
    file?: Promise<FileUpload> | undefined,
    req?: any,
  ): Promise<Post> {
    const post = this.postRepo.create({ body: body, user: { id: req.userId } });

    // Handle file upload if an file is provided
    if (file) {
      const { createReadStream, filename } = await file;

      const uploadDir = join(
        process.cwd(),
        'uploads',
        'users',
        `${req.userId}`,
        'posts',
      );

      const filenameWithTimestamp = `${Date.now()}-${filename}`;
      const relativePath = `/uploads/users/${req.userId}/posts/${filenameWithTimestamp}`;
      await fileUpload(uploadDir, file);

      post.filePath = relativePath;
    }

    return this.postRepo.save(post);
  }

  async getPostsByType(
    limit: number,
    offset: number,
    type: String,
  ): Promise<{ posts: Post[]; total: number }> {
    const query = this.postRepo.createQueryBuilder('post');

    if (type === 'photo') {
      query.andWhere(
        `post.filePath REGEXP '\\\\.(jpg|jpeg|png|gif|webp|bmp)$'`,
      );
    } else if (type === 'video') {
      query.andWhere(`post.filePath REGEXP '\\\\.(mp4|webm|mov|avi|mkv)$'`);
    } else if (type === 'text') {
      query.andWhere('post.filePath IS NULL');
    }

    const [posts, total] = await query
      .take(limit)
      .skip(offset)
      .orderBy('post.createdAt', 'DESC')
      .getManyAndCount();

    return { posts, total };
  }

  async getPostByUserId(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<{ posts: Post[]; total: number }> {
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
