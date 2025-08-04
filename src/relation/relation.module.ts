import { Module } from '@nestjs/common';
import { RelationService } from './relation.service';
import { RelationResolver } from './relation.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relation } from './relation.entity';
import { AuthModule } from 'src/shared/guards/auth.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [TypeOrmModule.forFeature([Relation]), AuthModule, ChatModule],
  providers: [RelationService, RelationResolver],
  exports: [ChatModule],
})
export class RelationModule {}
