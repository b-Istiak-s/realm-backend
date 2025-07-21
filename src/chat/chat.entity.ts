import { ChatMessage } from 'src/chat-message/chat-message.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['chatInitiator', 'chatReceiver'])
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.chatInitiator, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  chatInitiator: User;

  @ManyToOne(() => User, (user) => user.chatReceiver, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  chatReceiver: User;

  @Column({ type: 'text', nullable: true })
  lastMessage: string;

  // Changed to direct relation with User
  @ManyToOne(() => User, { nullable: true })
  lastMessageSender: User | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => ChatMessage, (message) => message.chat, {
    cascade: true,
  })
  messages: ChatMessage[];
}
