import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum RelationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
}

@Entity()
@Unique(['requester', 'addressee'])
export class Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.relationshipsInitiated, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  requester: User;

  @ManyToOne(() => User, (user) => user.relationshipsReceived, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  addressee: User;

  @Column({
    type: 'enum',
    enum: RelationStatus,
    default: RelationStatus.PENDING,
  })
  status: RelationStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
