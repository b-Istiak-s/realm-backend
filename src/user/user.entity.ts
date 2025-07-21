import { ChatMessage } from 'src/chat-message/chat-message.entity';
import { Chat } from 'src/chat/chat.entity';
import { Friend } from 'src/friend/friend.entity';
import { Post } from 'src/post/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AuthToken } from './auth/auth-token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // ====================relations====================
  @OneToMany(() => AuthToken, (token) => token.user)
  tokens: AuthToken[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Friend, (friend) => friend.requester)
  friendshipsInitiated: Friend[];

  @OneToMany(() => Friend, (friend) => friend.addressee)
  friendshipsReceived: Friend[];

  @OneToMany(() => Chat, (chat) => chat.chatInitiator)
  chatInitiator: Chat[];

  @OneToMany(() => Chat, (chat) => chat.chatReceiver)
  chatReceiver: Chat[];

  @OneToMany(() => Chat, (chat) => chat.lastMessageSender)
  lastMessageSender: Chat[];

  @OneToMany(() => ChatMessage, (message) => message.sender)
  messages: ChatMessage[];
}
