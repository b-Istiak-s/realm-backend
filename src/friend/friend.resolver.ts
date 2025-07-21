import { Args, Int, Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { FriendService } from './friend.service';
import { FriendOutput } from './dto/friend.output';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@UseGuards(AuthGuard)
@Resolver()
export class FriendResolver {
  constructor(private readonly friendService: FriendService) {}

  @Query(() => [FriendOutput], { name: 'friendships' })
  async getFriendships(@Args('userId', { type: () => Int }) userId: number) {
    return this.friendService.getFriendshipsByUserId(userId);
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
