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

  async getChatbyId(id: number): Promise<Chat | null> {
    return this.chatRepository.findOne({
      where: { id: id },
      relations: ['chatInitiator', 'chatReceiver'],
    });
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
  async createChat(chatReceiverId: number, req: any): Promise<Chat | null> {
    const chat = this.chatRepository.create({
      chatInitiator: { id: req.userId },
      chatReceiver: { id: chatReceiverId },
    });
    await this.chatRepository.save(chat);

    return this.getChatbyId(chat.id);
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
