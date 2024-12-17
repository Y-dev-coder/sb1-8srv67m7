import { Observable } from '@nativescript/core';
import { Message } from '../../models/message.model';
import { ChatService } from '../../services/chat/chat.service';
import { AuthService } from '../../services/auth/auth.service';

export class ChatViewModel extends Observable {
  private chatService: ChatService;
  private authService: AuthService;
  private _messages: Message[] = [];
  private _messageText = '';
  private conversationId: string;

  constructor(conversationId: string) {
    super();
    this.chatService = new ChatService();
    this.authService = AuthService.getInstance();
    this.conversationId = conversationId;
    this.loadMessages();
  }

  get messages(): Message[] {
    return this._messages;
  }

  get messageText(): string {
    return this._messageText;
  }

  set messageText(value: string) {
    if (this._messageText !== value) {
      this._messageText = value;
      this.notifyPropertyChange('messageText', value);
    }
  }

  async loadMessages() {
    try {
      this._messages = await this.chatService.getMessages(this.conversationId);
      this.notifyPropertyChange('messages', this._messages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  }

  async sendMessage() {
    if (!this.messageText.trim()) return;

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      console.error('No user logged in');
      return;
    }

    try {
      await this.chatService.sendMessage({
        conversationId: this.conversationId,
        senderId: currentUser.uid,
        content: {
          original: this.messageText,
          translated: ''
        },
        type: 'text',
        status: 'sent'
      });

      this.messageText = '';
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}