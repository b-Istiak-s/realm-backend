import { ConflictException, Injectable } from '@nestjs/common';
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

  async getFriendshipsByUserId(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<{ friendships: Friend[]; total: number }> {
    const [friendships, total] = await this.friendRepository.findAndCount({
      where: [{ requester: { id: userId } }, { addressee: { id: userId } }],
      relations: ['requester', 'addressee'],
      take: limit,
      skip: offset,
    });
    return { friendships, total };
  }

  // firstUser is requester and secondUser is addressee
  // firstUser -> secondUser and secondUser -> firstUser are considered same
  async existFriendship(
    firstUser: number,
    secondUser: number,
  ): Promise<boolean> {
    const exist = await this.friendRepository.findOne({
      where: [
        { requester: { id: firstUser }, addressee: { id: secondUser } },
        { requester: { id: secondUser }, addressee: { id: firstUser } },
      ],
    });
    return exist !== null; // checks if the "relationship" is found
  }

  async createFriendship(
    addresseeId: number,
    req: any,
  ): Promise<Friend | null> {
    const friendship = this.friendRepository.create({
      requester: { id: req.userId },
      addressee: { id: addresseeId },
    });

    const existFriendship = await this.existFriendship(req.userId, addresseeId);
    if (existFriendship) {
      throw new ConflictException('Already found the friend or pending');
    }

    await this.friendRepository.save(friendship);

    return this.getFriendshipById(friendship.id);
  }

  async updateFriendshipStatus(
    id: number,
    status: string,
  ): Promise<Friend | null> {
    const friendship = await this.friendRepository.findOneBy({ id });
    if (!friendship) {
      throw new Error('Friendship not found');
    }
    friendship.status = status as FriendStatus;
    await this.friendRepository.save(friendship);

    return this.getFriendshipById(friendship.id);
  }
}
