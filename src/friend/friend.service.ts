import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Friend, FriendStatus } from './friend.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async createFriendship(
    requesterId: number,
    addresseeId: number,
  ): Promise<Friend> {
    const friendship = this.friendRepository.create({
      requester: { id: requesterId },
      addressee: { id: addresseeId },
    });
    return this.friendRepository.save(friendship);
  }

  async getFriendshipsByUserId(userId: number): Promise<Friend[]> {
    return this.friendRepository.find({
      where: [{ requester: { id: userId } }, { addressee: { id: userId } }],
      relations: ['requester', 'addressee'],
    });
  }

  async updateFriendshipStatus(id: number, status: string): Promise<Friend> {
    const friendship = await this.friendRepository.findOneBy({ id });
    if (!friendship) {
      throw new Error('Friendship not found');
    }
    friendship.status = status as FriendStatus;
    return this.friendRepository.save(friendship);
  }
}
