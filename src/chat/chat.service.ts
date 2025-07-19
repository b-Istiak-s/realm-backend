import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createChat(
    chatInitiatorId: number,
    chatReceiverId: number,
  ): Promise<Chat> {
    const chat = this.chatRepository.create({
      chatInitiator: { id: chatInitiatorId },
      chatReceiver: { id: chatReceiverId },
    });
    return this.chatRepository.save(chat);
  }

  async getChatsByUserId(userId: number): Promise<Chat[]> {
    return this.chatRepository.find({
      where: [
        { chatInitiator: { id: userId } },
        { chatReceiver: { id: userId } },
      ],
      relations: ['chatInitiator', 'chatReceiver'],
    });
  }

  async updateChat(
    id: number,
    lastMessage: string,
    lastMessageSenderId: number,
  ): Promise<Chat> {
    const chat = await this.chatRepository.findOneBy({ id });
    if (!chat) {
      throw new Error('Chat not found');
    }

    const user = await this.userRepository.findOneBy({
      id: lastMessageSenderId,
    });
    if (!user) {
      throw new Error('User not found');
    }

    chat.lastMessage = lastMessage;
    chat.lastMessageSender = user;
    return this.chatRepository.save(chat);
  }
}
