import { Observable } from '@nativescript/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/chat.model';

export class ChatViewModel extends Observable {
  private chatService: ChatService;
  private _messages: Message[] = [];
  private _messageText: string = '';
  public currentUserId: string = 'user123'; // TODO: Get from auth service
  public chatName: string = '';

  constructor() {
    super();
    this.chatService = new ChatService();
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

  async sendMessage() {
    if (!this.messageText.trim()) return;

    const message: Partial<Message> = {
      senderId: this.currentUserId,
      receiverId: 'recipient123', // TODO: Get from chat context
      originalText: this.messageText,
      originalLanguage: 'en',
      targetLanguage: 'fr', // TODO: Get from recipient's settings
    };

    await this.chatService.sendMessage(message);
    this.messageText = '';
  }

  startVoiceRecording() {
    // TODO: Implement voice recording functionality
    console.log('Starting voice recording...');
  }
}