import { ChatMessageOutput } from '../dto/chat-message.output';
import { ChatMessagePaginatedOutput } from '../dto/chat-message-paginated.output';

export function toChatMessageOutput(chatMessage: any): ChatMessageOutput {
  return Object.assign(new ChatMessageOutput(), chatMessage);
}
export function toChatMessagePaginatedOutput(data: {
  messages: any[];
  total: number;
}): ChatMessagePaginatedOutput {
  return {
    messages: data.messages.map(toChatMessageOutput),
    total: data.total,
  };
}
