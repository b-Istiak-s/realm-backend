import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessageService } from './chat-message.service';
import { ConnectedSocket } from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly ChatMessageService: ChatMessageService) {}

  handleConnection(client: Socket) {
    // console.log(`Client connected: ${client.id}`);
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

    // Emit with consistent structure
    this.server.to(`chat_${payload.chatId}`).emit('receive_message', {
      id: savedMessage.id,
      message: savedMessage.message,
      createdAt: savedMessage.createdAt,
      sender: {
        id: savedMessage.sender.id,
        name: savedMessage.sender.name,
      },
    });

    return savedMessage; // For acknowledgement if needed
  }

  @SubscribeMessage('join_chat')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() chatId: number,
  ) {
    client.join(`chat_${chatId}`);
  }

  @SubscribeMessage('leave_chat')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() chatId: number,
  ) {
    client.leave(`chat_${chatId}`);
  }
}
