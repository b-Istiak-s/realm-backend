import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { graphqlConfig } from './graphql.config';
import { PostModule } from './post/post.module';
import { RelationModule } from './relation/relation.module';
import { ChatModule } from './chat/chat.module';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { AuthModule } from './shared/guards/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads', // this becomes your public URL prefix
    }),
    DatabaseModule,
    GraphQLModule.forRoot(graphqlConfig),
    UserModule,
    PostModule,
    RelationModule,
    ChatModule,
    ChatMessageModule,
  ],
})
export class AppModule {}
