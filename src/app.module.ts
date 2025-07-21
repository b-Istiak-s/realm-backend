import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { graphqlConfig } from './graphql.config';
import { PostModule } from './post/post.module';
import { FriendModule } from './friend/friend.module';
import { ChatModule } from './chat/chat.module';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { AuthModule } from './shared/guards/auth.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot(graphqlConfig),
    UserModule,
    PostModule,
    FriendModule,
    ChatModule,
    ChatMessageModule,
  ],
})
export class AppModule {}
