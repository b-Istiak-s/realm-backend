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

  async getFriendshipById(id: number): Promise<Friend | null> {
    return this.friendRepository.findOne({
      where: { id: id },
      relations: ['requester', 'addressee'],
    });
  }

  async getFriendshipsByUserId(userId: number): Promise<Friend[]> {
    return this.friendRepository.find({
      where: [{ requester: { id: userId } }, { addressee: { id: userId } }],
      relations: ['requester', 'addressee'],
    });
  }

  async createFriendship(
    addresseeId: number,
    req: any,
  ): Promise<Friend | null> {
    const friendship = this.friendRepository.create({
      requester: { id: req.userId },
      addressee: { id: addresseeId },
    });
    await this.friendRepository.save(friendship);

    return this.getFriendshipById(friendship.id);
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
