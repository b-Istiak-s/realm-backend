import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Relation, RelationStatus } from './relation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class RelationService {
  constructor(
    @InjectRepository(Relation)
    private readonly relationRepository: Repository<Relation>,
    private readonly chatService: ChatService,
  ) {}

  async getRelationshipById(id: number): Promise<Relation | null> {
    return this.relationRepository.findOne({
      where: { id: id },
      relations: ['requester', 'addressee'],
    });
  }

  async getRelationshipsByUserId(
    userId: number,
    status: string,
    limit: number,
    offset: number,
  ): Promise<{ relationships: Relation[]; total: number }> {
    if (!Object.values(RelationStatus).includes(status as RelationStatus)) {
      throw new BadRequestException('Invalid relationship status');
    }
    const [relationships, total] = await this.relationRepository.findAndCount({
      where: [
        { requester: { id: userId } },
        { addressee: { id: userId } },
        { status: status as RelationStatus },
      ],
      relations: ['requester', 'addressee'],
      take: limit,
      skip: offset,
    });
    return { relationships, total };
  }

  // firstUser is requester and secondUser is addressee
  // firstUser -> secondUser and secondUser -> firstUser are considered same
  async existRelationship(
    firstUser: number,
    secondUser: number,
  ): Promise<boolean> {
    const exist = await this.relationRepository.findOne({
      where: [
        { requester: { id: firstUser }, addressee: { id: secondUser } },
        { requester: { id: secondUser }, addressee: { id: firstUser } },
      ],
    });
    return exist !== null; // checks if the "relationship" is found
  }

  async createRelationship(
    addresseeId: number,
    req: any,
  ): Promise<Relation | null> {
    const relationship = this.relationRepository.create({
      requester: { id: req.userId },
      addressee: { id: addresseeId },
    });

    const existRelationship = await this.existRelationship(
      req.userId,
      addresseeId,
    );
    if (existRelationship) {
      throw new ConflictException('Already found the relation or pending');
    }

    await this.relationRepository.save(relationship);

    return this.getRelationshipById(relationship.id);
  }

  async updateRelationshipStatus(
    id: number,
    status: string,
    req: any,
  ): Promise<Relation | null> {
    const relationship = await this.relationRepository.findOneBy({ id });
    if (!relationship) {
      throw new NotFoundException('Relationship not found');
    }
    if (!Object.values(RelationStatus).includes(status as RelationStatus)) {
      throw new BadRequestException('Invalid relationship status');
    }
    const userId = req.user?.id || req.userId;
    if (
      relationship.addressee.id !== userId &&
      relationship.requester.id !== userId
    ) {
      throw new ForbiddenException(
        'You do not have permission to delete this relationship',
      );
    }

    relationship.status = status as RelationStatus;
    await this.relationRepository.save(relationship);

    // create chat when relationship are approved
    if (status === RelationStatus.ACCEPTED) {
      await this.chatService.createChat(
        relationship.requester.id === userId
          ? relationship.addressee.id
          : relationship.requester.id,
        req,
      );
    }

    return this.getRelationshipById(relationship.id);
  }

  async deleteRelationship(id: number, req: any): Promise<void> {
    const relationship = await this.relationRepository.findOne({
      where: { id },
      relations: ['addressee', 'requester'],
    });

    if (!relationship) {
      throw new NotFoundException('Relationship not found');
    }
    const userId = req.user?.id || req.userId;

    if (
      relationship.addressee.id !== userId &&
      relationship.requester.id !== userId
    ) {
      throw new ForbiddenException(
        'You do not have permission to delete this relationship',
      );
    }

    await this.relationRepository.delete({ id });
  }
}
