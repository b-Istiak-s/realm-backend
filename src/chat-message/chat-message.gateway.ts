import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessageService } from './chat-message.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly ChatMessageService: ChatMessageService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody()
    payload: {
      chatId: number;
      senderId: number;
      message: string;
    },
  ) {
    const savedMessage = await this.ChatMessageService.createMessage(
      payload.chatId,
      payload.senderId,
      payload.message,
    );

    this.server
      .to('chat_' + String(payload.chatId))
      .emit('receive_message', savedMessage);
    return savedMessage;
  }

  @SubscribeMessage('join_chat')
  handleJoinRoom(@MessageBody() chatId: number, client: Socket) {
    client.join('chat_' + String(chatId));
  }
}
