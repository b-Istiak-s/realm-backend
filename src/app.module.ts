import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { graphqlConfig } from './graphql.config';
import { PostModule } from './post/post.module';
import { FriendModule } from './modules/friend/friend.module';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot(graphqlConfig),
    UserModule,
    PostModule,
    FriendModule,
  ],
})
export class AppModule {}
