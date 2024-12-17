import { Message } from '../../models/message.model';

export interface SendMessageOptions {
  content: string;
  conversationId: string;
  senderId: string;
  languages?: {
    from?: string;
    to: string;
  };
}

export interface GetMessagesOptions {
  conversationId: string;
  limit?: number;
  beforeTimestamp?: Date;
}