import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Relation, RelationStatus } from './relation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RelationService {
  constructor(
    @InjectRepository(Relation)
    private readonly relationRepository: Repository<Relation>,
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
  ): Promise<Relation | null> {
    const relationship = await this.relationRepository.findOneBy({ id });
    if (!relationship) {
      throw new NotFoundException('Relationship not found');
    }
    if (!Object.values(RelationStatus).includes(status as RelationStatus)) {
      throw new BadRequestException('Invalid relationship status');
    }
    relationship.status = status as RelationStatus;
    await this.relationRepository.save(relationship);

    return this.getRelationshipById(relationship.id);
  }
}
