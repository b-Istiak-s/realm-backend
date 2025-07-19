import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.chatInitiator, {
    nullable: false,
  })
  chatInitiator: User;

  @ManyToOne(() => User, (user) => user.chatReceiver, {
    nullable: false,
  })
  chatReceiver: User;

  @Column({ type: 'text', nullable: true })
  lastMessage: string;

  @ManyToOne(() => User, (user) => user.lastSender, {
    nullable: true,
  })
  lastMessageSender: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
