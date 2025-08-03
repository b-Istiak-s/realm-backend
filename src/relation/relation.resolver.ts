import { Args, Int, Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { RelationService } from './relation.service';
import { RelationOutput } from './dto/relation.output';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RelationPaginatedOutput } from './dto/relation-paginated.output';
import {
  toRelationOutput,
  toRelationPaginatedOutput,
} from './helper/relation-output.helper';

@UseGuards(AuthGuard)
@Resolver()
export class RelationResolver {
  constructor(private readonly relationService: RelationService) {}

  @Query(() => RelationPaginatedOutput, { name: 'relationships' })
  async getRelationships(
    @Args('status') status: string,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number,
    @Context('req') req?: any,
  ): Promise<RelationPaginatedOutput> {
    const { relationships, total } =
      await this.relationService.getRelationshipsByUserId(
        req.userId,
        status,
        limit,
        offset,
      );
    return toRelationPaginatedOutput({ relationships, total });
  }

  @Mutation(() => RelationOutput)
  async createRelationship(
    @Args('addresseeId', { type: () => Int }) addresseeId: number,
    @Context('req') req: any,
  ) {
    return toRelationOutput(
      await this.relationService.createRelationship(addresseeId, req),
    );
  }

  @Mutation(() => RelationOutput)
  async updateRelationshipStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status') status: string,
  ) {
    return toRelationOutput(
      await this.relationService.updateRelationshipStatus(id, status),
    );
  }
}
