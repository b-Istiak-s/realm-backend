import { Args, Int, Resolver, Query, Mutation } from '@nestjs/graphql';
import { FriendService } from './friend.service';
import { FriendOutput } from './dto/friend.output';

@Resolver()
export class FriendResolver {
  constructor(private readonly friendService: FriendService) {}

  @Query(() => [FriendOutput], { name: 'friendships' })
  async getFriendships(@Args('userId', { type: () => Int }) userId: number) {
    return this.friendService.getFriendshipsByUserId(userId);
  }

  @Mutation(() => FriendOutput)
  async createFriendship(
    @Args('requesterId', { type: () => Int }) requesterId: number,
    @Args('addresseeId', { type: () => Int }) addresseeId: number,
  ) {
    return this.friendService.createFriendship(requesterId, addresseeId);
  }

  @Mutation(() => FriendOutput)
  async updateFriendshipStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status') status: string,
  ) {
    return this.friendService.updateFriendshipStatus(id, status);
  }
}
