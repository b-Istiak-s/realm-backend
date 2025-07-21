import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { AuthModule } from 'src/shared/guards/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), AuthModule],
  providers: [PostService, PostResolver],
})
export class PostModule {}
