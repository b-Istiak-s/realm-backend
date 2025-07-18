import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { graphqlConfig } from './graphql.config';

@Module({
  imports: [DatabaseModule, GraphQLModule.forRoot(graphqlConfig), UserModule],
})
export class AppModule {}
