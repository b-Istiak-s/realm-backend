import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum FriendStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
}

@Entity()
@Unique(['requester', 'addressee'])
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.friendshipsInitiated, {
    nullable: false,
  })
  requester: User;

  @ManyToOne(() => User, (user) => user.friendshipsReceived, {
    nullable: false,
  })
  addressee: User;

  @Column({
    type: 'enum',
    enum: FriendStatus,
    default: FriendStatus.PENDING,
  })
  status: FriendStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
