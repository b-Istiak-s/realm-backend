import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessageOutput } from './dto/chat-message.output';

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async createMessage(
    chatId: number,
    senderId: number,
    message: string,
  ): Promise<ChatMessageOutput> {
    const chatMessage = this.chatMessageRepository.create({
      chat: { id: chatId },
      sender: { id: senderId },
      message,
    });
    return this.chatMessageRepository.save(chatMessage);
  }

  async getMessagesByChatId(chatId: number): Promise<ChatMessageOutput[]> {
    return this.chatMessageRepository.find({
      where: { chat: { id: chatId } },
      relations: ['chat', 'sender'],
      order: { createdAt: 'ASC' },
    });
  }
}
