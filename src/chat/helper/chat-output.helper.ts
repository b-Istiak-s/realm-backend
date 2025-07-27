import { ChatPaginatedOutput } from '../dto/chat-paginated.output';
import { ChatOutput } from '../dto/chat.output';

export function toChatOutput(chat: any): ChatOutput {
  return Object.assign(new ChatOutput(), chat);
}

export function toChatPaginatedOutput(data: {
  chats: any[];
  total: number;
}): ChatPaginatedOutput {
  return {
    chats: data.chats.map(toChatOutput),
    total: data.total,
  };
}
