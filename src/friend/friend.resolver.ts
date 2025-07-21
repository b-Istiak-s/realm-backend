import { Args, Int, Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { FriendService } from './friend.service';
import { FriendOutput } from './dto/friend.output';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { FriendPaginatedOutput } from './dto/friend-paginated.output';

@UseGuards(AuthGuard)
@Resolver()
export class FriendResolver {
  constructor(private readonly friendService: FriendService) {}

  @Query(() => FriendPaginatedOutput, { name: 'friendships' })
  async getFriendships(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 }) offset: number,
  ): Promise<FriendPaginatedOutput> {
    const { friendships, total } = await this.friendService.getFriendshipsByUserId(userId, limit, offset);
    return { friendships, total };
  }

  @Mutation(() => FriendOutput)
  async createFriendship(
    @Args('addresseeId', { type: () => Int }) addresseeId: number,
    @Context('req') req: any,
  ) {
    return this.friendService.createFriendship(addresseeId, req);
  }

  @Mutation(() => FriendOutput)
  async updateFriendshipStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status') status: string,
  ) {
    return this.friendService.updateFriendshipStatus(id, status);
  }
}
