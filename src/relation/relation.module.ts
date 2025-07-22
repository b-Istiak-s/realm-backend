import { Module } from '@nestjs/common';
import { RelationService } from './relation.service';
import { RelationResolver } from './relation.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relation } from './relation.entity';
import { AuthModule } from 'src/shared/guards/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Relation]), AuthModule],
  providers: [RelationService, RelationResolver],
})
export class RelationModule {} 